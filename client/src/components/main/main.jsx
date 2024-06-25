
import Allproblems from "../Allproblems/Allproblems";

import Navbar from "../navbar/Navbar";


const Main = () => {


	return (
		<div >
			<Navbar/>
			<div className="flex w-[1000px]">
             <Allproblems/>
			</div>
		</div>
	);
};

export default Main;