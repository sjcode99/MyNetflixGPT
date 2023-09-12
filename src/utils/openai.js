import OpenAI from "openai";
import { OPENAI_KEY } from "./constants";
// import { useSelector } from "react-redux";

// const OPENAI_KEY = useSelector((store) => store.gpt?.OPENAI_KEY);

const openai = new OpenAI({
  apiKey: OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});

export default openai;
