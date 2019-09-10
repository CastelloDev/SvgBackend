import express from 'express';
import dataUriToBuffer from 'data-uri-to-buffer';
import bodyParser from 'body-parser';
import svgToDataURL from 'svg-to-dataurl';
import { svgo } from "../SvgBackend/src/svgo.config";
import SVGO from "svgo";

const app = express();
const port = process.env.PORT || 3500;
const svgoObject = new SVGO(svgo);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", function(req, res) {
    res.send("Again I Go Unnoticed");
});

app.get('/optimizeSvg',function(req,res){
    svgoObject.optimize(dataUriToBuffer(req.body.dataUrl).toString()).then(result => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({urlData:svgToDataURL(result.data)}));
  })
  .catch(err => console.log(err));
});
  
app.listen(port, () => console.log(`Example app listening on port ${port}!`));