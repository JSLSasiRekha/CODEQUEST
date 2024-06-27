
const Card=({type,component,count})=>{
return(
    <>
    <div className="gap-2 w-[180px] rounded-xl bg-[#EFF9ED] pt-10 text-2xl p-4">
    <div className="flex gap-3 ml-2 w-30 ">
          {component}
          <p className="w-20 -mt-2">
        {type}
        </p>
        </div>
        <div>
       
        <p className="mt-1 w-10 ml-4 text-[#3bb19b] text-7xl">
        <strong>{count}</strong>
        </p>
        </div>
       
    </div>
    </>
)
}
export default Card;