import { surpriseMePrompts } from "../constants";
import FileSaver from "file-saver";

export function getRandomPrompt(prompt) {
  return surpriseMePrompts[
    Math.floor(Math.random() * surpriseMePrompts.length)
  ];
}

export async function downloadImage(_id, photo) {
  FileSaver.saveAs(photo, `download-$(_id).jpg`);
}
