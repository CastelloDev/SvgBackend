import express from "express";
import dataUriToBuffer from "data-uri-to-buffer";
import bodyParser from "body-parser";
import svgToDataURL from "svg-to-dataurl";
import { svgo } from "../SvgBackend/src/svgo.config";
import {OPTIMIZE_SVG} from "./src/constants/constants";
import {declareColourClass} from "./src/helpers/svgHelper/svgHelper";
import SVGO from "svgo";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3500;
const svgoObject = new SVGO(svgo);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post(OPTIMIZE_SVG, function(req, res) {
  svgoObject
    .optimize(dataUriToBuffer(req.body.dataUrl).toString())
    .then(result => {
      let newDataWithColorClass = declareColourClass(result);
      res.send(
        JSON.stringify({ urlData: svgToDataURL(newDataWithColorClass) })
      );
    })
    .catch(err => console.log(err));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
