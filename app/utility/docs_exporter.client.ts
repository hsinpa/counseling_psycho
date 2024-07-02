
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils/index.js';
import { saveAs } from 'file-saver';
import expressionParser from 'docxtemplater/expressions'

function loadFile(url: string, callback: any) {
    PizZipUtils.getBinaryContent(url, callback);
}

export  const  generate_document = async (docs_url: string, name: string, docs_body: string) => {
    loadFile(
      docs_url,
      function (error: Error, content: string) {
        if (error) {
          throw error;
        }
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
          parser: expressionParser,
        });
        doc.render({
            output: docs_body,
            title: name,
        });
        const out = doc.getZip().generate({
          type: 'blob',
          mimeType:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        }); //Output the document using Data-URI
        saveAs(out, name + '.docx');
      }
    );
  };

