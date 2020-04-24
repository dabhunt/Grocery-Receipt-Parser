import {Fragment, render, h, Component } from 'preact';
import { Link } from 'preact-router/match';
import * as style from './style.scss';
import Card from '../card';
import {Food} from "../../util/food";
import {Receipt} from "../../util/receipt";
import * as preact from 'preact';
import { headerText } from '../card/style.scss';
/*Container is the parent component used to control 'cards' that contain grid formatted ino
*/
interface Props {
	receipt: Receipt;
}
function CreateCard(newFood) {
	return (
	  <Fragment>
		<h3>{newFood.foodType} ({newFood.nameCode})</h3>
		<li>{newFood.price}</li>
		<li>{newFood.quantity}</li>
	  </Fragment>
	)
  }

const SEARCH = 'https://api.github.com/search/repositories';
export default function ListFoods() {
	const [items, setItems] = this.setState([]);

	this.useEffect(() => {
		fetch(`${SEARCH}?q=preact`)
			.then(res => res.json())
			.then(data => setItems((data && data.items) || []));
	}, []);

	return (
		<Fragment>
			<div>
			<h1 style="text-align:center; font-weight: 200">Example</h1>
			<div class="list">
				{items.map(result => (
					<Result {...result} />
				))}
			</div>
		</div>
		</Fragment>
	);
}
const Result = result => (
	<div class="repl-list-item">
		<div>
			<a
				href={result.html_url}
				target="_blank"
				rel="noopener noreferrer"
				class="repl-link"
			>
				{result.full_name}
			</a>
			{" - "}
			<strong>{result.stargazers_count}</strong>
		</div>
		<p>{result.description}</p>
	</div>
);

