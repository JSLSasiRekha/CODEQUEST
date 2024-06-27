
import {CircularProgress, Card, CardBody, CardFooter, Chip} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-4 bg-[#EFF9ED] pt-4  w-[400px]">
    <Card className=" w-[240px] h-[240px] border-none bg-[#EFF9ED] pt-8 ">
      <CardBody className="justify-center items-center pb-0">
        <CircularProgress
          classNames={{
            svg: "w-36 h-32 drop-shadow-md",
            indicator: "stroke-[#3bb19b]",
            track: "stroke-[#3bb19b]/10",
            value: "text-3xl font-semibold text-black -mt-[82px] ml-[38px]",
          }}
          value={60}
          strokeWidth={4}
          showValueLabel={true}
        />
      </CardBody>
      <CardFooter className="justify-center items-center pt-0 mt-4">
        <Chip
          classNames={{
            base: "border-1 border-black/30",
            content: "text-black/90 text-small font-semibold",
          }}
          variant="bordered"
        >
          280 Solved Questions
        </Chip>
      </CardFooter>
    </Card>
    <div className="flex flex-col gap-3 pb-4">
  <div className=" rounded-lg shadow-md p-2 w-24 mr-8">
    <strong className="text-[#3bb19b]">Easy</strong>
    <p className="text-center text-xl font-bold">100</p>
  </div>
  <div className=" rounded-lg shadow-md p-2 w-24 mr-8">
  <strong className="text-[#3bb19b]">Medium</strong>
      <p className="text-center text-xl font-bold">100</p>
    
  </div>
  <div className=" rounded-lg shadow-md p-2 w-24 mr-8">
  <strong className="text-[#3bb19b]">Hard</strong>
      <p className="text-center text-xl font-bold">100</p>
   
  </div>
</div>
    </div>
  );
}
