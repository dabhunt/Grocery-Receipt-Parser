import { h, Component } from 'preact';
import * as style from './style.scss';

interface Props {}
export default class Home extends Component<Props> {
	public render() {
		return (
			<div class={style.home}>
				<h1>Home</h1>
				<p>This is the Home component.</p>
			</div>
		);
	} 
}
