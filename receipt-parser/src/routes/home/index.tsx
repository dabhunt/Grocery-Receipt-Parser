import { h, Component } from 'preact';
import * as style from './style.scss';

interface Props {}
export default class Home extends Component<Props> {
	public render() {
		return (
			<div class={style.home}>
				<div class={style.heroimage}>
					<div class = {style.herotext}>
					<h1>Pocket Chef</h1>
					<h2>Scan grocery receipts to get recipe recommendations</h2>
					<button class={style.button}>Sign Up</button>
					<button class={style.button}>Log In</button>
					</div>
				</div>
			</div>

		);
	} 
}
