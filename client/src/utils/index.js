import { surpriseMePrompts } from "../constants";

export function getRandomPrompt(prompt) {
  return surpriseMePrompts[
    Math.floor(Math.random() * surpriseMePrompts.length)
  ];
}
