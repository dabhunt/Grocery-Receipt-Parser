import {Fragment, render, h, Component, JSX } from 'preact';
// import {} from 'preact/hooks'
import { Link } from 'preact-router/match';
import {Food} from "../../util/food";
import {MakeSearchable} from "../../util/utilities";
import * as style from './style.scss';
/*Container is the parent component used to control 'cards' that contain grid formatted ino
*/
interface Props {
	food: Food;
}
interface State {
	//verified means whether the user has checked the food result for accuracy
	textInputExists: boolean;
	checking: boolean;
	correct: boolean;
	autoSuggested: string[];
};
export default class Card extends Component<Props,State> {
	state:State = {
			//verified means whether the user has checked the food result for accuracy
		textInputExists: false,
		checking: false,
		correct: false,
		autoSuggested: [],
	}
	Replace = () =>
	{	
		console.log("replace button pressed");
		this.setState({checking: true, correct: false})
	}
	SearchFoodDataBase(event)
	{
		this.setState({textInputExists: true});
		var str =  MakeSearchable(event.target.value);
		fetch('https://cors-anywhere.herokuapp.com/https://trackapi.nutritionix.com/v2/search/instant/?query='+str, {
			method: 'GET',
			headers: {
				'x-app-id': 'e3caf2bf',
				'x-app-key': 'c65245d0606a0245ed43d0c5b673fa1d',
			},
			}).then(response => response.json()
			).then(json =>{
				console.log("searching instant 2.0")
				var strFoods = [];
				for (var i = 0; i < 5; i++)
				{
					if (json.common[i] == null)
						break;
					strFoods.push(json.common[i].food_name);
				}
				this.setState({autoSuggested: strFoods});
			}).catch(error => {
				console.error(error);
				alert('Search Failed. ' + error);
			});
	}
	ConfirmFood()
	{
		this.setState({checking: false});
		console.log("confirming Food");
	}
	public render({ food }: Props, { checking, correct, autoSuggested, textInputExists }: State) {
		return (
			<Fragment>
				<main class = {style.card}>
					<p class = {style.foodCode}>"{food.nameCode}"</p>
					<h3 class = {style.foodType}>Found:<br></br> {food.foodType} </h3> 		
					<button class ={style.button} onClick={() => this.Replace()}> Replace </button>
					{checking &&
					<div id="modal" class={style.modal}>
						<label>
							Search for the Correct Food: <br></br>
						<input onInput={ (event) => this.SearchFoodDataBase(event)} type="text" name="foodSearch" />
						{textInputExists && autoSuggested.map(text => {
							return <button class={style.autoComplete} onClick={() => this.ConfirmFood()}>{text}</button>
						})}
						</label>
					</div>
					}
					{/* <img id="image" class = {style.itemA} src="#" >Select some files</img> */}
				</main>
			</Fragment>
			//<img id="image" class = {style.itemA} src="#" >Select some files</img>
		);
	}
}
// const Card = (props: Props, { verified, correct }: State):JSX.Element => {

// 	const {food} = props;
// 	return (
// 		<main class = {style.card}>
// 			<p class = {style.foodCode}>"{food.nameCode}"</p>
// 			<h3 class = {style.foodType}>Found:<br></br> {food.foodType} </h3> 		
// 			<button class ={style.button} onInput={ (event) => this.imageSelected(event) }> Replace </button>
// 			{//!verified && <div id="verify">No File Selected</div>}
// 			}
			
// 			{/* <img id="image" class = {style.itemA} src="#" >Select some files</img> */}
// 		</main>
// 	);
// }
// const Card = (props: Props, { verified, correct }: State):JSX.Element => {

// 	const {food} = props;
// 	return (
// 		<main class = {style.card}>
// 			<p class = {style.foodCode}>"{food.nameCode}"</p>
// 			<h3 class = {style.foodType}>Found:<br></br> {food.foodType} </h3> 		
// 			<button class ={style.button} onInput={ (event) => this.imageSelected(event) }> Replace </button>
// 			{//!verified && <div id="verify">No File Selected</div>}
// 			}
			
// 			{/* <img id="image" class = {style.itemA} src="#" >Select some files</img> */}
// 		</main>
// 	);
// }



//export default Card;