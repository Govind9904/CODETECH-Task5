const SearchBox=document.querySelector('.searchBox');
const SearchBtn=document.querySelector('.searchbtn');
const recipecontainer=document.querySelector('.recipe-container');
const recipeDetaisContent=document.querySelector('.recipe-details-content');
const recipedetails=document.querySelector('.recipe-details');
const closebtn=document.querySelector('.closebtn');
//const recipecloseBtn=document.querySelector('.recipe-close-Btn'); 
//const clsbtn=document.querySelector('.btnclose')

const fetchRecipe=async (query)=>{
   recipecontainer.innerHTML="<h2>Searching Recipes...</h2>"
   try {
   
   const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
   const response= await data.json();
   
   recipecontainer.innerHTML='';
   response.meals.forEach(meal => {
      const recipeDiv=document.createElement('div');
      recipeDiv.classList.add('recipe');
      
      recipeDiv.innerHTML=`
      <img src="${meal.strMealThumb}">
      <h3>${meal.strMeal}</h3>
      <p><span>${meal.strArea}</span> Dish</p>
      <p>Belonds to <span>${meal.strCategory}</span> Category</p>
      `
      const butoon=document.createElement('button')
      butoon.textContent="View Recipe";
      recipeDiv.appendChild(butoon);






// adding event listner to recipe button
    butoon.addEventListener("click",()=>{
      openRecipePopup(meal);
      recipedetails.style.display="block";
      recipedetails.style.display="block";
    })
   
      recipecontainer.appendChild(recipeDiv);
   });
      
  } 
  catch (error) {
      recipecontainer.innerHTML='<h2>Error in Searching Recipes...</h2>'
  }
}
const fetchIngredients=(meal)=>{
   let IngridientsList=""
   for(let i=1;i<=20;i++){
      const Ingridient=meal[`strIngredient${i}`];
      if(Ingridient){
         const measure=meal[`strMeasure${i}`];
         IngridientsList+=`<li>${measure} ${Ingridient}</li>`
      }
      else{
         break;   
      }
   }
   return IngridientsList;
   

}
const openRecipePopup=(meal)=>{
   recipedetails.innerHTML=`
   <h2 class="recipeName"> ${meal.strMeal}<button type="button" class="closebtn">X</button></h2>
   <h3>Ingridients:</h3>
   <ul class="ingridientList">${fetchIngredients(meal)}</ul>
   <div class="recipeInstructions">
      <h3>Instructions</h3>
      <p> ${meal.strInstructions}<p>
   </div>
   `
}
//const closebtn=document.querySelector('.recipeName')
//closebtn.addEventListener("click",()=>{
 //  recipedetails.style.display="none";
//})

// closebtn.addEventListener("click",()=>{
//    recipecontainer.style.display="none"
// })

// closebtn.addEventListener('click',()=>{
//    recipeDetaisContent.parentElement.style.display="block"
// })

 
SearchBtn.addEventListener("click",(e)=>{
   e.preventDefault();
   const searchInput=SearchBox.value.trim();
   if(!searchInput){
      recipecontainer.innerHTML=`<h2>Type the meal in the Search Box...</h2>`
      return;
   }
   fetchRecipe(searchInput);
   
})
