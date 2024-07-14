import { Editor } from "@monaco-editor/react";
import {
  Select,
  SelectItem,
  Tab,
  Tabs,
  Textarea,
} from "@nextui-org/react";
import { useState } from "react";
import { Pane } from "split-pane-react";
import axios from "axios";
import { url } from "../../config";
import { useGlobalContext } from '../../context';
import { useParams } from 'react-router-dom';

const CODE_SNIPPETS = {
  cpp: "#include<bits/stdc++.h>\nusing namespace std;\n\nint main() {\n\t// code\n\treturn 0;\n}",
  python: "# code",
  java: "public class Main {\n\tpublic static void main(String[] args) {\n\t\t//code\n\t}\n}",
  c:"#include <stdio.h>\nint main()\n{\n\t// code\n\treturn 0;\n}"
};

const Compiler = () => {
  const { user } = useGlobalContext();
  const { slug } = useParams();
  const [code, setCode] = useState(CODE_SNIPPETS["cpp"]);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [running, setRunning] = useState(false);

  const handleRunCode = async () => {
    setRunning(true);
    setOutput("Running...");
    const payload = {
      language,
      code,
      input,
   

    };

    try {
      const { data } = await axios.post(`${url}/api/code/run`, payload);
      console.log(data)
      // console.log(JSON.stringify(data.output.stderr, null, 2));
      setRunning(false);
      setOutput(data.output)
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSubmitCode =async () => {
    setRunning(true);
    setOutput("Submitting code...");
    console.log("user",user.userId);
    const payload = {
      language,
      code,
      userId:user.userId,
      problemSlug:slug,
    };
    try {
      const { data } = await axios.post(`${url}/api/code/submit`, payload);
     
      setRunning(false);
    
      setOutput(data.status)
    } catch (error) {
      console.log(error.response);
    }

  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    setCode(CODE_SNIPPETS[e.target.value]);
  };

  return (
    <Pane>
      <div className="px-6 bg-gray-700 text-white min-h-screen ">
        <div className="flex flex-row flex-wrap gap-3 ">
        <Select
          className="max-w-xs flex-col mx-[500px] w-32  my-3 border-gray-300 focus:border-primary"
          defaultSelectedKeys={["cpp"]}
          placeholder="Cpp"
          onChange={handleLanguageChange}
        >
          <SelectItem className="text-white w-16" key="cpp">Cpp</SelectItem>
          <SelectItem className="text-white w-16" key="python">Python</SelectItem>
          <SelectItem className="text-white w-16" key="java">Java</SelectItem>
          <SelectItem className="text-white w-16" key="c">C</SelectItem>
        </Select>

        
        </div>
        <Editor
          height="65vh"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value)}
        />
        <div className="flex flex-row">
          <div className="flex-[80%]">
            <Tabs aria-label="Options" className="mt-1">
              {!running && (
                <Tab key="input" className="pl-2  " title="Input">
                  <Textarea
                    className="w-full mb-2 bg-white flex-1 text-black"
                    placeholder="Input"
                    value={`${running ? "Running..." : input}`}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </Tab>
              )}
              <Tab key="output" className="pl-2" title="Output">
                <Textarea
                  className={` w-full mb-2 bg-white flex-1 pl-2 ${output.stderr ? 'text-red-500' : 'text-black'}`} 
                  placeholder="Output"
                  value={output.stderr?output.stderr:output}
                  readOnly
                />
              </Tab>
            </Tabs>

          </div>
        </div>
        <div className="flex gap-x-6 -mx-2">
            <button className="bg-gray-500 py-2 w-24 px-4 m-4 rounded " onClick={handleRunCode}>
              Run
            </button>
            <button className="bg-[#3bb19b] py-2 w-24 px-4 m-4 rounded " onClick={handleSubmitCode}>
              Submit
            </button>
          </div>
      </div>
    </Pane>
  );
};

export default Compiler;