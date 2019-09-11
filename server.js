import express from "express";
import dataUriToBuffer from "data-uri-to-buffer";
import bodyParser from "body-parser";
import svgToDataURL from "svg-to-dataurl";
import { svgo } from "../SvgBackend/src/svgo.config";
import SVGO from "svgo";

const app = express();
const port = process.env.PORT || 3500;
const svgoObject = new SVGO(svgo);
const svgCodeToBeInserted =
  "<defs><style>.colour-class{fill:#FFFFFF;}</style></defs>";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/optimizeSvg", function(req, res) {
  svgoObject
    .optimize(dataUriToBuffer(req.body.dataUrl).toString())
    .then(result => {
      var newDataWithColorClass = " ";
      if (result.data.toString().search(svgCodeToBeInserted) < 0) {
        const PositionToInsert = result.data.toString().indexOf(">") + 1;
        newDataWithColorClass = [
          result.data.toString().slice(0, PositionToInsert),
          svgCodeToBeInserted,
          result.data
            .toString()
            .slice(PositionToInsert, result.data.toString().length)
        ].join();
      } else {
        newDataWithColorClass = result.data;
      }

      res.send(
        JSON.stringify({ urlData: svgToDataURL(newDataWithColorClass) })
      );
    })
    .catch(err => console.log(err));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
