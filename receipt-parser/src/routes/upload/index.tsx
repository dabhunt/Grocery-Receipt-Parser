import { h, Component } from 'preact';
//const unirest = eval(require('unirest'));
// const unirest = require('unirest');
import * as style from './style.scss';

const image = document.getElementById("uploadedImage") as HTMLInputElement;
interface Props {

}
export default class Upload extends Component<Props> {
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
				this.setState({imageFile : targetFile});
				const objectURL = window.URL.createObjectURL(targetFile);
				let img = document.createElement('img');
				//display a loading gif
				img.src = "/assets/photos/loading.gif";
				//convert to the ass compatible version
				img.id = style.loading.toString();
				//container.append(img);
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
	*/
	OCRImage = (imgURL) =>
	{
		//console.log(imgURL);
		let userMessage:HTMLElement = document.getElementById("userMessage") as HTMLElement;
		//currently the image that is being parsed is a static picture of a receipt for testing purposes, switch out these lines when testing is over
		//fetch('https://cors-anywhere.herokuapp.com/https://api.ocr.space/parse/imageurl?apikey=8038106a3788957&url='+imgURL, {
		fetch('https://cors-anywhere.herokuapp.com/https://api.ocr.space/parse/imageurl?apikey=8038106a3788957&url=https://i.imgur.com/ft21vh0.jpg', {
			method: 'GET',
			}).then(response => {
				if (response.ok) {
					userMessage.innerHTML = "JSON Parsed by OCR:";
					var res = response.json;
					userMessage.append(res.toString()); 
				}
			}).catch(error => {
				console.error(error);
				alert('Upload failed: ' + error);
			});
	}
	public render() {
		return (
			<div>
				<div class = {style.heroimage}>
				<div class = {style.containerText}>
				<div class = {style.elem}>
					<h1 class = {style.heroText}>Upload Receipt</h1>
					<div id = "container" class = {style.container}>
						
						<input id="fileElem" onInput={ (event) => this.imageSelected(event) } type ='file' />
						<br></br>
						<img id="filePreview" src="#" >Select some files</img>
						<div id="userMessage">No File Selected</div>
					</div>
				</div>
				</div>
				</div>
			</div>
		);
	} 
}
