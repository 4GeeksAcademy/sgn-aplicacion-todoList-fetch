import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import Acordeon from "./Acordeon";

//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<h1 className="h1">Todos </h1>
			<Acordeon/>
		</div>
	);
};

export default Home;


