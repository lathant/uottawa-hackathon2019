import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import SearchField from './SearchField';
import IngredientField from './components/IngredientField';
import RecipeCard from './components/RecipeCard';

class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      enteredIngredientList: [],
      recipes: [],
      allRecipes: [
        {
          username: 'B',
          name: "Roasted Brussels Sprouts",
          description: "Turn your failure cabbages into a rock star-esque dish",
          imgPath: "./images/recipeA.png", 
          instruction: "1)Preheat oven to 400 degrees F <br> 2)Cut off the brown ends of the Brussels sprouts and pull off any yellow outer leaves. Mix them in a bowl with the olive oil, salt and pepper. Pour them on a sheet pan and roast for 35 to 40 minutes, until crisp on the outside and tender on the inside. Shake the pan from time to time to brown the sprouts evenly. Sprinkle with more kosher salt ( I like these salty like French fries), and serve immediately. ",
          ingredientTags: ["Brussels Sprouts"],
          ingredientList: ["1 1/2 pounds Brussels sprouts", "3 tablespoons good olive oil", "3/4 teaspoon kosher salt", "1/2 teaspoon freshly ground black pepper"],
        },
        {
          username: 'Z',
          name: "Zucchini Parmesan Crisps",
          description: "Make alot out of a little, show off your skills by making something out of nothing",
          imgPath: "./images/recipeC.png",
          instruction: "1) Preheat the oven to 450 degrees F. Coat a baking sheet with cooking spray <br> 2) Slice the zucchini into 1/4-inch thick rounds. In a medium bowl, toss the zucchini with the oil. In a small bowl, combine the Parmesan, bread crumbs, salt, and a few turns of pepper. Dip each round into the Parmesan mixture, coating it evenly on both sides, pressing the coating on to stick, and place in a single layer on the prepared baking sheet. <br> 3) Bake the zucchini rounds until browned and crisp, 25 to 30 minutes. Remove with spatula. Serve immediately",
          ingredientTags: ["zucchini", "Parmesan cheese", "Bread Crumbs"],
          ingredientList: ["2 medium zucchini (about 1 pound total)", "1 tablespoon olive oil", " 1/4 cup freshly grated Parmesan (3/4-ounce)", "1/4 cup plain dry bread crumbs", "1/8 teaspoon salt", "Freshly ground black pepper"]
        },
        {
          username: 'F',
          name: "Asian Grilled Salmon",
          description: "Fish but Asian and grilled",
          imgPath: "./images/recipeD.png",
          instruction: "1) Light charcoal briquettes in a grill and brush the grilling rack with oil to keep the salmon from sticking. <br> 2) While the grill is heating, lay the salmon skin side down on a cutting board and cut it crosswise into 4 equal pieces. Whisk together the mustard, soy sauce, olive oil, and garlic in a small bowl. Drizzle half of the marinade onto the salmon and allow it to sit for 10 minutes. <br> 3) Place the salmon skin side down on the hot grill; discard the marinade the fish was sitting in. Grill for 4 to 5 minutes, depending on the thickness of the fish. Turn carefully with a wide spatula and grill for another 4 to 5 minutes. The salmon will be slightly raw in the center, but don't worry; it will keep cooking as it sits. <br> 4) Transfer the fish to a flat plate, skin side down, and spoon the reserved marinade on top. Allow the fish to rest for 10 minutes. Remove the skin and serve warm, at room temperature, or chilled.",
          ingredientTags: ["salmon", "garlic", "Dijon mustard", "Parmesan cheese"],
          ingredientList:["1 side fresh salmon, boned but skin on (about 3 pounds)", "2 tablespoons Dijon mustard", "3 tablespoons good soy sauce",  "6 tablespoons good olive oil", "1/2 teaspoon minced garlic"]     
        },
        {
          username: 'CC',
          name: "Caprese Stuffed Balsamic Chicken",
          description: "Chicken little, alternate ending",
          imgPath: "./images/recipeE.png",
          instruction: "1)Preheat oven to 180°C | 350°F. Cut a pocket about 3/4 quarter of the way through on the thickest side of each breast, being careful not to cut all the way. <br> 2)Season chicken with salt, pepper, and dried herbs. Pour 1 teaspoon of sun dried tomato oil over each breast, rubbing some of the seasoning inside the pockets. <br> 3)Fill each with 2 slices fresh tomato, 2 teaspoons sun dried tomato strips, one slice mozzarella cheese and basil leaves. <br> 4) Seal with 3-4 toothpicks diagonally to keep the filling inside while cooking. <br> 5) Heat 2 teaspoons of sun dried tomato oil (or olive oil) in a skillet or non stick pan over medium-high heat. Add the chicken and fry for 2 minutes on each side until golden. <br> 6) While the chicken is cooking, mix together the garlic, balsamic vinegar and brown sugar in a small jug. Pour the mixture into the pan around the chicken; bring to a simmer while stirring occasionally, until the glaze has slightly thickened (about 2-3 minutes). <br> 7) Transfer pan to the preheated oven and continue to cook for a further 10-15 minutes, or until the chicken is cooked through and the cheese has melted. <br> 8) Remove toothpicks and drizzle with pan juices.",
          ingredientTags: ["Chicken", "Mozzarella", "garlic", "basil", "roma tomatoes" ],
          ingredientList: ["4 (200-gram | 7-ounce) chicken breasts", "Salt and pepper , to season", "1 teaspoon each of dried oregano and dried basil", "2 roma tomatoes , sliced thinly", "1/4 cup sun dried tomato strips in oil", "4 mozzarella cheese slices (or cheese of choice)", "12 basil leaves , divided", "4 cloves garlic , minced or finely chopped", "1/3 cup balsamic vinegar", "2 tablespoons brown sugar"]
        }
      ]
    };
  }

  componentDidMount(){
    this.filterRecipes();
  }

  ingredientExist(searchTarget){
    const targetIndex = this.state.enteredIngredientList.indexOf(searchTarget);    
    return targetIndex !== -1;
  }

  filterRecipes = () => {
    const { enteredIngredientList, allRecipes } = this.state;

    const filteredRecipes = 
      allRecipes.filter(
        (recipe) => {
          const existInRecipeIngredients = (enteredIngredient) => recipe.ingredientTags.includes(enteredIngredient);
          const compareResult = enteredIngredientList.every(existInRecipeIngredients);
          return compareResult;
      });
      
    this.setState({
      recipes: filteredRecipes
    });
  }

  render() {
    const { enteredIngredientList, recipes } = this.state;

    const invalidInput = (stringInput) => stringInput === "" || stringInput === " ";

    const searchOnEnter = (newIngredient) => {

      if(this.ingredientExist(newIngredient) || invalidInput(newIngredient)) return;

      this.setState({
        enteredIngredientList: [...this.state.enteredIngredientList, newIngredient]
      }, this.filterRecipes);
    }

    const onDelete = (deleteingItem) => {
      this.setState(state => {
        const ingredientList = [...state.enteredIngredientList];
        const ingredientToDelete = ingredientList.indexOf(deleteingItem);
        enteredIngredientList.splice(ingredientToDelete, 1);
        return { enteredIngredientList };
      }, this.filterRecipes);
    }

    const RecipeCols = () => {
      const isOffsetDisplay = (index, odd) => (odd ? index % 2 === 0 : index % 2 !== 0 );

      return(
        <Row className="recipeRow">
          <Col className="recipeCol">
          {
            recipes.map(
              (recipe, index) => ( isOffsetDisplay(index, true) && <RecipeCard key={recipe.name} { ...recipe } />)
            )
          }
          </Col>
          <Col className="recipeCol">
          {
            recipes.map(
              (recipe, index) => ( isOffsetDisplay(index, false) && <RecipeCard key={recipe.name} { ...recipe } />)
            )
          }
          </Col>
        </Row>
      );
    };

    return (
      <Container className="root-container">
        <Row className="justify-content-md-center">
          <Col xs lg="2">
            <SearchField
              onEnter={searchOnEnter}
            />
            <IngredientField 
              chipContentArray={enteredIngredientList}
              handleDelete={onDelete}
            />
            <RecipeCols />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
