import { h, Component, Fragment } from 'preact';
//const unirest = eval(require('unirest'));
// const unirest = require('unirest');
var render = require('preact-render-to-string');
//import * as interfaces from "../../util/food";
import {Food} from "../../util/food";
import {Receipt} from "../../util/receipt";
import {replaceAll} from "../../util/utilities";
import {removeNumbers} from "../../util/utilities";
import {renderNode} from "../../util/utilities";
import {tableCreator} from "../../util/tableCreator";
import Result from '../../components/container/index';
import ListFoods from '../../components/container/index';
import Card from '../../components/card/index';
import {StoreSpecificParsingRules as rules} from "../../util/receipt";
import * as style from './style.scss';
import { realpathSync } from 'fs';
import * as preact from 'preact';


const image = document.getElementById("uploadedImage") as HTMLInputElement;
interface Props {
	receipt: Receipt;
};

interface State {
	showingReceipt: boolean;
};
export default class Upload extends Component<Props, State> {
	/*
	when the user inserts an image into the form, it automatically runs this, getting the file through the event passed in
	*/

	imageSelected = (event) =>
	  {
		let filePreview:HTMLImageElement = document.getElementById("filePreview") as HTMLImageElement;
		let container:HTMLElement = document.getElementById("container") as HTMLElement;
		let userMessage:HTMLElement = document.getElementById("userMessage") as HTMLElement;
		const files = event.target.files;
		if (files && files.length > 0) {
			const targetFile = files[0];
			try 
			{
				const objectURL = window.URL.createObjectURL(targetFile);
				let img = document.createElement('img');
				//display a loading gif
				img.src = "/assets/photos/loading.gif";
				//convert to the ass compatible version
				img.id = style.loading.toString();
				container.append(img);
				filePreview.src = objectURL;
				//upload image to database as soon as it's done loading
				filePreview.onload = (evt) => {
					this.uploadImage(targetFile)
				};
				const userMsg = document.getElementById("userMessage");
				userMessage.innerHTML= "Loading image into database...";
			}
			catch(e) 
			{
				try {
				// Fallback if createObjectURL is not supported
				const fileReader = new FileReader();
				fileReader.onload = (evt) => {
					//img.src = evt.target.result;
				};
				fileReader.readAsDataURL(targetFile);
				}
				catch(e) {
				console.log(`File Upload not supported: ${e}`);
				}
			}
		}
	}
	/*
	takes an image file as an argument from the form, and uploads the image to the imgur database
	if this were a live server this would instead be uploading to an internal server
	*/
	uploadImage = (imgFile) => 
	{
		const formData = new FormData();
		formData.append('image', imgFile);
		let userMessage:HTMLElement = document.getElementById("userMessage") as HTMLElement;
		fetch('https://cors-anywhere.herokuapp.com/https://api.imgur.com/3/image', {
			method: 'POST',
			headers: {
			Authorization: 'Client-ID 9bef5cb834dab23',
			},
			body: formData,
			}).then(response => response.json()
			).then(json =>{
				userMessage.innerHTML = "Upload successful. Parsing...";
				let link = json.data.link;
				userMessage.append(link);
				this.OCRImage(link);
			}).catch(error => {
				console.error(error);
				alert('Upload failed: ' + error);
			});
	}
	/*
	takes the string URL to an image file stored online, and sends it to the OCR api to identify text inside the image
	for testing, I am saving the Json locally so that I don't hit the OCR API free rate limit cap
	*/
	OCRImage = (imgURL) =>
	{
		let userMessage:HTMLElement = document.getElementById("userMessage") as HTMLElement;
		var receiptstr = localStorage.getItem("receiptJson");
		//uncomment out the line below so that it uses the OCR API
		//receiptstr = null;
		var receiptJson;
		//if there is already a receipt Json stored locally, parse it instead of using the OCR api
		if (receiptstr != null)
		{
			userMessage.innerHTML = "Receipt found in local storage.";
			receiptJson = JSON.parse(receiptstr);
			this.convertToFoods(receiptJson);
		} else{
		//currently the image that is being parsed is a static picture of a receipt for testing purposes, switch out these lines when testing is over
		//fetch('https://cors-anywhere.herokuapp.com/https://api.ocr.space/parse/imageurl?apikey=8038106a3788957&url='+imgURL, {
		fetch('https://cors-anywhere.herokuapp.com/https://api.ocr.space/parse/imageurl?apikey=8038106a3788957&url=https://i.imgur.com/ft21vh0.jpg', {
			method: 'GET',
			}).then(response => response.json()
			).then(json =>{
				userMessage.innerHTML = "Receipt saved to local storage.";
				receiptJson = json;
				//convert to string so that it can be saved by local storage
				let str = JSON.stringify(receiptJson);
				localStorage.setItem('receiptJson',str);
				this.convertToFoods(receiptJson);
			}).catch(error => {
				console.error(error);
				alert('Upload failed: ' + error);
			});
		}
	}
	convertToFoods = (json) =>
	{
		var str = JSON.stringify(json);
		let userMessage:HTMLElement = document.getElementById("userMessage") as HTMLElement;
		userMessage.innerHTML = "Getting food data...<br>";
		let ParsedText = json.ParsedResults[0].ParsedText;
		var split = ParsedText.split('\n');
		var storeName;
		var today = new Date();
		var newReceipt = new Receipt(today,storeName,0);
		for (var i = 0; i < split.length; i ++){
			if (split[i].includes("Total"))
				break;
			if (i == 0){
				//use the first line of the receipt to determine what store the receipt is from
				//this could later be used to differentiate stores receipts
				newReceipt.storeName = split[i];
				//skip the first few lines of the receipt
				i += 3;
			}
			else{
				//if the first character is an @ or the length of the string is less than 5, ignore it
				if (split[i].charAt(0) == '@' || split[i].length < 5){}
				else{
					//get the food data if it's in the database
					var item = JSON.parse(localStorage.getItem(split[i]));
					console.log("adding '"+ split[i] +"' from localstorage");
					//if this food code is not already in the database, add it
					if (item == null){
						//construct new food datatype 
						item = new Food(split[i],storeName,1,2.1);
						//newReceipt.foods.push(newFood);
						
						console.log("adding new food '"+item.nameCode+"'");
						//convert to string for local storage
						
						let strFood = JSON.stringify(item);
						window.localStorage.setItem(split[i],strFood);
						item = localStorage.getItem(split[i]);
					}
					newReceipt.foods.push(item);
				}
			}
		}
		newReceipt = this.searchFoodAPI(newReceipt, 0);
		console.log(newReceipt);
	}
	/* Use the NutrionX API and search for each item from the receipt Json
	*/
	searchFoodAPI = (receipt, num) =>
	{
		let userMessage:HTMLElement = document.getElementById("userMessage") as HTMLElement;
		var updatedReceipt = new Receipt(new Date(),receipt.storeName,0);
		updatedReceipt = receipt;
		console.log("num" + num);
		let str = updatedReceipt.foods[num].nameCode;
		console.log("before: "+str);
		str = removeNumbers(str);
		//strings that should be replaced with '' Use space at the end
		var removeStrings = [' OZ','ORGANIC', ' ORG', 'ORG ', ' CT'];
		//strings that should be replaced with %20 to indicate a space for the query
		var replaceEmptyStrings = ['\r',' '];
		//replace characters in the string
		str = replaceAll(str,removeStrings, '');
		str = replaceAll(str,replaceEmptyStrings, '%20');
		//str = this.removeNumbers(str);
		console.log(str);
		fetch('https://cors-anywhere.herokuapp.com/https://trackapi.nutritionix.com/v2/search/instant/?query='+str, {
			method: 'GET',
			headers: {
				'x-app-id': 'e3caf2bf',
				'x-app-key': 'c65245d0606a0245ed43d0c5b673fa1d',
			},
			}).then(response => response.json()
			).then(json =>{
				var foodtype = json.common[0].food_name;
				var newFood = updatedReceipt.foods[num];
				updatedReceipt.foods[num].id = json.common[0].tag_name;
				updatedReceipt.foods[num].foodType = foodtype;
				num++;
				//temporary until I can do this a better way in preact
				userMessage.innerHTML += "adding " + foodtype + " to database... <br>";
			  
				//userMessage.append(ListFoods());
				console.log("adding " + foodtype + " to database...");
				
				//upon finishing 1 food request, perform another, like a giant for loop 
				//if (num < updatedReceipt.foods.length)
				const dom = (
					<Card food={newFood} />
				)
				//this stuff isn't working yet

				//h(dom,{newFood});
				//userMessage.appendChild(dom);
				//var table = render(tableCreator(updatedReceipt.foods))
				//console.log(table);
				//userMessage.append(table);
				//let dom = render(newFood, userMessage);
				if (num < updatedReceipt.foods.length)
					this.searchFoodAPI(updatedReceipt,num);
				
			}).catch(error => {
				console.error(error);
				alert('Search Failed. ' + error);
			});
			
		return updatedReceipt;
	}
	public render({ receipt }: Props, { showingReceipt}: State) {
		return (
			<div>
				<div class = {style.heroimage}>
				<div class = {style.containerText}>
				<div class = {style.elem}>
					<h1 class = {style.heroText}>Upload Receipt</h1>
					<div id = "container" class = {style.container}>
						
						<input id="fileElem" onInput={ (event) => this.imageSelected(event) } type ='file' />
						<br></br>
						<img id="filePreview" class = {style.filePreview} src="#" >Select some files</img>
						<div id="userMessage">No File Selected</div>
						<div class="list">
						<div class="list">
						</div>
						</div>
					</div>
				</div>
				</div>
				</div>
			</div>
		);
	} 
}


