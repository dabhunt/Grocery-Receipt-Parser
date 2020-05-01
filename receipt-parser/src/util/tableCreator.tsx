//import render from 'preact-render-to-string';
import { h, Fragment } from 'preact';
import {Food} from "./food";
var render = require('preact-render-to-string');

/**
 * This function returns a two-column table that can either be overloaded with a style class, or have some default
 * in-line style that allows for the table to be used in emailJS.
 * @param {choice[]} props The source array for the table to be created
 * @param {string} [className] Optional CSS classes to be provided for the table's styling
 * @param {string} [column1Name] Name for the first column of the table
 * @param {string} [column2Name] Name for the second column of the table
 * @param {boolean} [toComponent] Whether to return a component or the plain html
 * 
 * @return {string | h.JSX.Element} Returns a component that contains the table, or a stringified version of the
 * component if toComponent is false
 */
export function tableCreator(
    props: Food[],
    className?: string,
    column1Name?: string,
    column2Name?: string,
    toComponent?: boolean): string | h.JSX.Element {
    //Accounting for if there are no choices selected in the array
    if (props.length >= 1) {
        let table: h.JSX.Element;

        if (className) {
            table = <Fragment>
                <table class={className}>
                    <thead>
                        <tr>
                            <th>{column1Name || "Name"}</th>
                            <th>{column2Name || "Frequency"}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.map((item: Food, index: number) => {
                            // Only generate a table row when the value is true
                            if (item.foodType) {
                                return <tr key={index}>
                                    <td>{item.foodType}</td>
                                    <td>{'('+ item.nameCode+')' || "None Supplied"}</td>
                                </tr>
                            }
                        })}
                    </tbody>

                </table>
            </Fragment>
        } else {
            // If a className isn't given, then use in-line styling in order to make it compatable with email services or easier on the user.
            table = <Fragment>
                <table style="width: 100%; border-collapse: collapse">
                    <thead>
                        <tr>
                            <th style="border: 1px solid black; text-align: left; padding: 4px;">{column1Name || "Name"}</th>
                            <th style="border: 1px solid black; text-align: left; padding: 4px; width: 35%; min-width: 64px;">{column2Name || "Frequency"}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.map((item: Food, index: number) => {
                            if (item.foodType) {
                                return <tr key={index}>
                                    <td style="border: 1px solid black; text-align: left; padding: 4px;">{item.foodType}</td>
                                    <td style="border: 1px solid black; text-align: left; padding: 4px;">{item.nameCode || "None Supplied"}</td>
                                </tr>
                            }
                        })}
                    </tbody>

                </table>
            </Fragment>
        }

        return toComponent ? table : render(table);
    }
}