import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import * as style from './style.scss';
export default class Header extends Component {
	public render() {
		return (
			<header class={style.header}>
				<Link activeClassName={style.active} href="/">
						<img className = {style.logo} src="/assets/icons/logo.svg"></img>
						<h1>Pocket Chef</h1>					
                </Link>
				
				<nav>
					<Link activeClassName={style.active} href="/">
						Home
                    </Link>
					<Link activeClassName={style.active} href="/profile">
						Profile
                    </Link>
				</nav>
			</header>
		);
	}
}
