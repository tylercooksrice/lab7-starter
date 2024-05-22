// RecipeCard.js

class RecipeCard extends HTMLElement {
	// Called once when document.createElement('recipe-card') is called, or
	// the element is written into the DOM directly as <recipe-card>
	constructor() {
		super(); // Inherit everything from HTMLElement

		// EXPOSE - START (All expose numbers start with A)
		// A1. TODO - Attach the shadow DOM to this Web Component (leave the mode open)
		const shadowRoot = this.attachShadow({ mode: 'open' });
		// A2. TODO - Create an <article> element - This will hold our markup once our data is set
		const article = document.createElement("article");
		// A3. TODO - Create a style element - This will hold all of the styles for the Web Component
		const style = document.createElement("style");
		style.innerHTML = `  
		* {
			font-family: sans-serif;
			margin: 0;
			padding: 0;
		  }
		
		  a {
			text-decoration: none;
		  }
		
		  a:hover {
			text-decoration: underline;
		  }
		
		  article {
			align-items: center;
			border: 1px solid rgb(223, 225, 229);
			border-radius: 8px;
			display: grid;
			grid-template-rows: 118px 56px 14px 18px 15px 36px;
			height: auto;
			row-gap: 5px;
			padding: 0 16px 16px 16px;
			width: 178px;
		  }
		
		  div.rating {
			align-items: center;
			column-gap: 5px;
			display: flex;
		  }
		
		  div.rating>img {
			height: auto;
			display: inline-block;
			object-fit: scale-down;
			width: 78px;
		  }
		
		  article>img {
			border-top-left-radius: 8px;
			border-top-right-radius: 8px;
			height: 118px;
			object-fit: cover;
			margin-left: -16px;
			width: calc(100% + 32px);
		  }
		
		  p.ingredients {
			height: 32px;
			line-height: 16px;
			padding-top: 4px;
			overflow: hidden;
		  }
		
		  p.organization {
			color: black !important;
		  }
		
		  p.title {
			display: -webkit-box;
			font-size: 16px;
			height: 36px;
			line-height: 18px;
			overflow: hidden;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		  }
		
		  p:not(.title),
		  span,
		  time {
			color: #70757A;
			font-size: 12px;
		  }
		`;
		// A4. TODO - Insert all of the styles from cardTemplate.html into the <style> element you just made (copy everything INSIDE the <style> tag>)
		shadowRoot.appendChild(article);
		shadowRoot.appendChild(style);
	}

	/**
	 * Called when the .data property is set on this element.
	 *
	 * For example:
	 * let recipeCard = document.createElement('recipe-card'); // Calls constructor()
	 * recipeCard.data = { foo: 'bar' } // Calls set data({ foo: 'bar' })
	 *
	 * @param {Object} data - The data to pass into the <recipe-card> must be of the
	 *                        following format:
	 *                        {
	 *                          "imgSrc": "string",
	 *                          "imgAlt": "string",
	 *                          "titleLnk": "string",
	 *                          "titleTxt": "string",
	 *                          "organization": "string",
	 *                          "rating": number,
	 *                          "numRatings": number,
	 *                          "lengthTime": "string",
	 *                          "ingredients": "string"
	 *                        }	
	 */
	set data(data) {
		// If nothing was passed in, return
		if (!data) return;

		// A6. TODO - Select the <article> we added to the Shadow DOM in the constructor
		const shadowArticle = this.shadowRoot.querySelector('article');
		
		// A7. TODO - Set the contents of the <article> with the <article> template given in
		//           cardTemplate.html and the data passed in (You should only have one <article>,
		//           do not nest an <article> inside another <article>). You should use template
		//           literals (template strings) and element.innerHTML for this.
		// 			 Do NOT include the <article> tags within the innerHTML of the element you create.
		//           Remember to replace all the placeholders in the template with the data passed in.
		//           i.e. imgSrc, titleLnk, etc

		let img = document.createElement('img');
		img.src = data.imgSrc;
		img.alt = data.imgAlt;
		shadowArticle.appendChild(img);

		let pTitle = document.createElement('p');
		pTitle.classList.add('title');
		let a = document.createElement('a');
		a.href = data.titleLnk;
		a.innerHTML = data.titleTxt;
		pTitle.appendChild(a);
		shadowArticle.appendChild(pTitle);

		let pOrg = document.createElement('p');
		pOrg.classList.add("organization");
		pOrg.innerHTML = data.organization;
		shadowArticle.appendChild(pOrg);

		let divRating = document.createElement("div");
		divRating.classList.add("rating");
		let span = document.createElement("span");
		span.innerHTML = data.rating;
		divRating.appendChild(span);
		let img2 = document.createElement('img');
		if (data.rating == 0) {
			img2.src = "./assets/images/icons/0-star.svg";
			img2.alt = "0 stars";
		} else if (data.rating == 1) {
			img2.src = "./assets/images/icons/1-star.svg";
			img2.alt = "1 stars";
		} else if (data.rating == 2) {
			img2.src = "./assets/images/icons/2-star.svg";
			img2.alt = "2 stars";
		} else if (data.rating == 3) {
			img2.src = "./assets/images/icons/3-star.svg";
			img2.alt = "3 stars";
		} else if (data.rating == 4) {
			img2.src = "./assets/images/icons/4-star.svg";
			img2.alt = "4 stars";
		} else if (data.rating == 5) {
			img2.src = "./assets/images/icons/5-star.svg";
			img2.alt = "5 stars";
		}
		divRating.appendChild(img2);
		let span1 = document.createElement("span");
		span1.innerHTML = "(" + data.numRatings + ")";
		divRating.appendChild(span1);
		shadowArticle.appendChild(divRating);

		let time = document.createElement("time");
		time.innerHTML = data.lengthTime;
		shadowArticle.appendChild(time);

		let ingredient = document.createElement("p");
		ingredient.classList.add("ingredients")
		ingredient.innerHTML = data.ingredients;
		shadowArticle.appendChild(ingredient);
	}
}
// A8. TODO - Define the Class as a customElement so that you can create
//           'recipe-card' elements

customElements.define("recipe-card", RecipeCard);