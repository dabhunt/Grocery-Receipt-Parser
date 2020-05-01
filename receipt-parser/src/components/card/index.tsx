import {Fragment, render, h, Component, JSX } from 'preact';
// import {} from 'preact/hooks'
import { Link } from 'preact-router/match';
import {Food} from "../../util/food";
import * as style from './style.scss';
/*Container is the parent component used to control 'cards' that contain grid formatted ino
*/
interface Props {
	food: Food;
}

const Card = (props: Props):JSX.Element => {
	const {food} = props;
	return (
		<main class = {style.card}>
			<h3 class = {style.headerText}>{food.foodType}</h3> 		
			<p class = {style.pText}>{food.nameCode}</p>
			{/* <img id="image" class = {style.itemA} src="#" >Select some files</img> */}
		</main>
	);
}

// export default class Card extends Component<Props> {

// 	public render() {
// 		return (
// 			<Fragment>
// 				<div class = {style.itemA}>
// 					<h3 class = {style.headerText}>{this.props.food.foodType}</h3>
// 					<p class = {style.pText}>{this.props.food.nameCode}</p>
// 				</div>
// 			</Fragment>
// 			//<img id="image" class = {style.itemA} src="#" >Select some files</img>
// 		);
// 	}
// }

export default Card;