package com.v2p.swp391.data;


import com.v2p.swp391.application.model.IngredientEntity;
import com.v2p.swp391.application.model.InstructionEntity;
import com.v2p.swp391.application.model.RecipeEntity;
import com.v2p.swp391.application.model.embeded.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


public class FakeRecipeDataGenerator {

    public static RecipeEntity generateFakeRecipe(int i) {
        RecipeEntity recipe = new RecipeEntity();

        recipe.setTitle("Pho With Zucchini Noodles "+ i);
        recipe.setReadyInMinutes(30);
        recipe.setServings(2);
        recipe.setSourceUrl("https://www.foodista.com/recipe/H45HTK22/how-to-make-pho-with-zucchini-noodles");
        recipe.setImageUrl("https://img.spoonacular.com/recipes/1096250-556x370.jpg");
        recipe.setImageType("jpg");

        Nutrition nutrition = new Nutrition();
        nutrition.setCaloricBreakdown(
                new CaloricBreakdown(
                        58.22,
                        15.4,
                        26.38));

        nutrition.setWeightPerServing(
                new WeightPerServing(
                        1053.0,
                        "g"));

        List<Nutrient> nutrients = new ArrayList<>();
        nutrients.add(new Nutrient("Calories", 322.48, "kcal", 16.12));
        nutrients.add(new Nutrient("Fat", 5.81, "g", 8.94));
        nutrients.add(new Nutrient("Saturated Fat", 1.89, "g", 11.82));
        nutrients.add(new Nutrient("Carbohydrates", 22.4, "g", 7.47));
        nutrients.add(new Nutrient("Net Carbohydrates", 15.01, "g", 5.46));
        nutrients.add(new Nutrient("Sugar", 12.5, "g", 13.89));
        nutrients.add(new Nutrient("Cholesterol", 67.02, "mg", 22.34));
        nutrients.add(new Nutrient("Sodium", 1678.92, "mg", 73.0));
        nutrients.add(new Nutrient("Protein", 49.44, "g", 98.88));
        nutrients.add(new Nutrient("Vitamin C", 91.01, "mg", 110.32));
        nutrients.add(new Nutrient("Manganese", 1.68, "mg", 84.15));
        nutrients.add(new Nutrient("Vitamin B6", 1.49, "mg", 74.26));
        nutrients.add(new Nutrient("Vitamin K", 63.24, "µg", 60.23));
        nutrients.add(new Nutrient("Selenium", 37.07, "µg", 52.96));
        nutrients.add(new Nutrient("Vitamin B3", 10.07, "mg", 50.34));
        nutrients.add(new Nutrient("Potassium", 1614.35, "mg", 46.12));
        nutrients.add(new Nutrient("Phosphorus", 423.08, "mg", 42.31));
        nutrients.add(new Nutrient("Zinc", 6.11, "mg", 40.76));
        nutrients.add(new Nutrient("Vitamin B2", 0.56, "mg", 33.22));
        nutrients.add(new Nutrient("Folate", 131.41, "µg", 32.85));
        nutrients.add(new Nutrient("Magnesium", 130.6, "mg", 32.65));
        nutrients.add(new Nutrient("Fiber", 7.39, "g", 29.57));
        nutrients.add(new Nutrient("Iron", 4.78, "mg", 26.57));
        nutrients.add(new Nutrient("Vitamin A", 1229.07, "IU", 24.58));
        nutrients.add(new Nutrient("Copper", 0.39, "mg", 19.52));
        nutrients.add(new Nutrient("Vitamin B1", 0.29, "mg", 19.49));
        nutrients.add(new Nutrient("Vitamin B12", 1.11, "µg", 18.49));
        nutrients.add(new Nutrient("Vitamin B5", 1.71, "mg", 17.06));
        nutrients.add(new Nutrient("Calcium", 161.68, "mg", 16.17));
        nutrients.add(new Nutrient("Vitamin E", 1.31, "mg", 8.76));
        nutrition.setNutrients(nutrients);

        List<Property> properties = new ArrayList<>();
        properties.add(new Property("Glycemic Index", 161.5, ""));
        properties.add(new Property("Glycemic Load", 2.19, ""));
        properties.add(new Property("Inflammation Score", -9.0, ""));
        properties.add(new Property("Nutrition Score", 36.0895652173913, "%"));
        nutrition.setProperties(properties);

        List<Flavonoid> flavonoids = Arrays.asList(
                new Flavonoid("Cyanidin", 0.0, ""),
                new Flavonoid("Petunidin", 0.0, ""),
                new Flavonoid("Delphinidin", 0.0, ""),
                new Flavonoid("Malvidin", 0.0, ""),
                new Flavonoid("Pelargonidin", 0.0, ""),
                new Flavonoid("Peonidin", 0.0, ""),
                new Flavonoid("Catechin", 0.0, "mg"),
                new Flavonoid("Epigallocatechin", 0.0, "mg"),
                new Flavonoid("Epicatechin", 0.0, "mg"),
                new Flavonoid("Epicatechin 3-gallate", 0.0, "mg"),
                new Flavonoid("Epigallocatechin 3-gallate", 0.0, "mg"),
                new Flavonoid("Theaflavin", 0.0, ""),
                new Flavonoid("Thearubigins", 0.0, ""),
                new Flavonoid("Eriodictyol", 0.0, ""),
                new Flavonoid("Hesperetin", 7.74, "mg"),
                new Flavonoid("Naringenin", 0.61, "mg"),
                new Flavonoid("Apigenin", 0.0, "mg"),
                new Flavonoid("Luteolin", 0.09, "mg"),
                new Flavonoid("Isorhamnetin", 0.0, "mg"),
                new Flavonoid("Kaempferol", 0.17, "mg"),
                new Flavonoid("Myricetin", 0.0, "mg"),
                new Flavonoid("Quercetin", 4.35, "mg"),
                new Flavonoid("Theaflavin-3,3'-digallate", 0.0, ""),
                new Flavonoid("Theaflavin-3'-gallate", 0.0, ""),
                new Flavonoid("Theaflavin-3-gallate", 0.0, ""),
                new Flavonoid("Gallocatechin", 0.0, "mg")
        );
        nutrition.setFlavonoids(flavonoids);

        List<IngredientEntity> ingredients = Arrays.asList(
                new IngredientEntity(
                        "Top Sirloin Steak",
                        0.25,
                        "pound",
                        Arrays.asList(
                                new Nutrient("Zinc", 4.54, "mg", 40.76),
                                new Nutrient("Folate", 14.74, "µg", 32.85),
                                new Nutrient("Vitamin B3", 7.34, "mg", 50.34),
                                new Nutrient("Vitamin C", 0.0, "mg", 110.32),
                                new Nutrient("Fat", 4.01, "g", 8.94),
                                new Nutrient("Vitamin B6", 0.71, "mg", 74.26),
                                new Nutrient("Caffeine", 0.0, "mg", 0.0),
                                new Nutrient("Copper", 0.09, "mg", 19.52),
                                new Nutrient("Lycopene", 0.0, "µg", 0.0),
                                new Nutrient("Selenium", 34.93, "µg", 52.96),
                                new Nutrient("Potassium", 404.83, "mg", 46.12),
                                new Nutrient("Sodium", 63.5, "mg", 73.0),
                                new Nutrient("Alcohol", 0.0, "g", 0.0),
                                new Nutrient("Choline", 105.46, "mg", 0.0),
                                new Nutrient("Iron", 1.83, "mg", 26.57),
                                new Nutrient("Saturated Fat", 1.48, "g", 11.82),
                                new Nutrient("Protein", 25.25, "g", 98.88),
                                new Nutrient("Manganese", 0.01, "mg", 84.15),
                                new Nutrient("Calories", 144.02, "kcal", 16.12),
                                new Nutrient("Net Carbohydrates", 0.0, "g", 5.46),
                                new Nutrient("Calcium", 24.95, "mg", 16.17),
                                new Nutrient("Poly Unsaturated Fat", 0.19, "g", 0.0),
                                new Nutrient("Mono Unsaturated Fat", 1.61, "g", 0.0),
                                new Nutrient("Folic Acid", 0.0, "µg", 0.0),
                                new Nutrient("Vitamin K", 1.25, "µg", 60.23),
                                new Nutrient("Carbohydrates", 0.0, "g", 7.47),
                                new Nutrient("Fiber", 0.0, "g", 29.57),
                                new Nutrient("Phosphorus", 239.27, "mg", 42.31),
                                new Nutrient("Vitamin D", 0.0, "µg", 0.0),
                                new Nutrient("Vitamin B12", 1.07, "µg", 18.49),
                                new Nutrient("Magnesium", 26.08, "mg", 32.65),
                                new Nutrient("Sugar", 0.0, "g", 13.89),
                                new Nutrient("Vitamin B5", 0.74, "mg", 17.06),
                                new Nutrient("Vitamin B2", 0.14, "mg", 33.22),
                                new Nutrient("Cholesterol", 66.9, "mg", 22.34),
                                new Nutrient("Vitamin A", 0.0, "IU", 24.58),
                                new Nutrient("Vitamin E", 0.32, "mg", 8.76),
                                new Nutrient("Vitamin B1", 0.09, "mg", 19.49)
                        )
                )


        );
        nutrition.setIngredients(ingredients);

        recipe.setNutrition(nutrition);


        List<InstructionEntity> analyzedInstructions = Arrays.asList(
                new InstructionEntity(
                        1,
                        "Place the sirloin steak in the freezer for 15 minutes for easy slicing.In the meantime, use a spiralizer or a julienne peeler to make zucchini noodles. Divide the zoodles in two large serving bowls.In a medium saucepan, toast cinnamon sticks, star anise, and cloves over medium heat until fragrant.",
                        Arrays.asList(
                                new IngredientEntity("zucchini noodles", "zucchini noodles", "https://spoonacular.com/cdn/ingredients_100x100/zoodles.jpg"),
                                new IngredientEntity("cinnamon stick", "cinnamon stick", "https://spoonacular.com/cdn/ingredients_100x100/cinnamon.jpg"),
                                new IngredientEntity("porterhouse steak", "porterhouse steak", "https://spoonacular.com/cdn/ingredients_100x100/tbone-or-porterhouse-raw.jpg"),
                                new IngredientEntity("star anise", "star anise", "https://spoonacular.com/cdn/ingredients_100x100/star-anise.jpg"),
                                new IngredientEntity("clove", "clove", "https://spoonacular.com/cdn/ingredients_100x100/cloves.jpg"),
                                new IngredientEntity("sandwich bread", "sandwich bread", "https://spoonacular.com/cdn/ingredients_100x100/white-bread.jpg")
                        ),
                        Arrays.asList(
                                new Equipment("sauce pan", "sauce pan", "https://spoonacular.com/cdn/equipment_100x100/sauce-pan.jpg"),
                                new Equipment("peeler", "peeler", "https://spoonacular.com/cdn/equipment_100x100/peeler.png"),
                                new Equipment("bowl", "bowl", "https://spoonacular.com/cdn/equipment_100x100/bowl.jpg")
                        ),
                        new InstructionDuration(15, "minutes")
                ),
                new InstructionEntity(
                        2,
                        "Add bone broth to the pan, followed by ginger, soy sauce, and fish sauce. Bring to a boil and simmer for 10 minutes to allow the spices to fully infuse the broth. Take the beef out of your freezer and slice it into thin strips. Divide the beef into two portions and add on top of the zoodles in the serving bowls. Once the broth is done, also divide it into two portions and pour the hot broth into the serving bowls. The beef will start cooking instantly and the color changes. Top the pho with bean sprouts, fresh herbs, sliced jalapeno pepper and green onions, drizzle with Sriracha or/and hoisin sauce, squeeze some lime juice in it and slurp up!",
                        Arrays.asList(
                                new IngredientEntity("jalapeno pepper", "jalapeno pepper", "https://spoonacular.com/cdn/ingredients_100x100/jalapeno-pepper.png"),
                                new IngredientEntity("bean sprouts", "bean sprouts", "https://spoonacular.com/cdn/ingredients_100x100/bean-sprouts.jpg"),
                                new IngredientEntity("hoisin sauce", "hoisin sauce", "https://spoonacular.com/cdn/ingredients_100x100/dark-sauce.jpg"),
                                new IngredientEntity("fresh herbs", "fresh herbs", "https://spoonacular.com/cdn/ingredients_100x100/mixed-fresh-herbs.jpg"),
                                new IngredientEntity("green onions", "green onions", "https://spoonacular.com/cdn/ingredients_100x100/spring-onions.jpg"),
                                new IngredientEntity("bone broth", "bone broth", "https://spoonacular.com/cdn/ingredients_100x100/chicken-broth.png"),
                                new IngredientEntity("fish sauce", "fish sauce", "https://spoonacular.com/cdn/ingredients_100x100/asian-fish-sauce.jpg"),
                                new IngredientEntity("lime juice", "lime juice", "https://spoonacular.com/cdn/ingredients_100x100/lime-juice.png"),
                                new IngredientEntity("soy sauce", "soy sauce", "https://spoonacular.com/cdn/ingredients_100x100/soy-sauce.jpg"),
                                new IngredientEntity("sriracha", "sriracha", "https://spoonacular.com/cdn/ingredients_100x100/hot-sauce-or-tabasco.png"),
                                new IngredientEntity("zucchini noodles", "zucchini noodles", "https://spoonacular.com/cdn/ingredients_100x100/zoodles.jpg"),
                                new IngredientEntity("ginger", "ginger", "https://spoonacular.com/cdn/ingredients_100x100/ginger.png"),
                                new IngredientEntity("spices", "spices", "https://spoonacular.com/cdn/ingredients_100x100/spices.png"),
                                new IngredientEntity("broth", "broth", "https://spoonacular.com/cdn/ingredients_100x100/chicken-broth.png"),
                                new IngredientEntity("beef", "beef", "https://spoonacular.com/cdn/ingredients_100x100/beef-cubes-raw.png"),
                                new IngredientEntity("pho", "pho", "")
                        ),
                        Arrays.asList(
                                new Equipment("bowl", "bowl", "https://spoonacular.com/cdn/equipment_100x100/bowl.jpg"),
                                new Equipment("frying pan", "frying pan", "https://spoonacular.com/cdn/equipment_100x100/pan.png")
                        ),
                        new InstructionDuration(10, "minutes")
                )
        );

//        recipe.setAnalyzedInstructions(analyzedInstructions);

        recipe.setSummary("""
                Pho With Zucchini Noodles is a <b>gluten free and dairy free</b> main course. For <b>$8.15 per serving</b>, this recipe <b>covers 37%</b> of your daily requirements of vitamins and minerals. This recipe serves 2. One portion of this dish contains roughly <b>49g of protein</b>, <b>6g of fat</b>, and a total of <b>322 calories</b>. This recipe is liked by 1 foodies and cooks. Not a lot of people really liked this Vietnamese dish. Head to the store and pick up cloves, basil, cinnamon sticks, and a few other things to make it today. From preparation to the plate, this recipe takes roughly <b>30 minutes</b>. It is brought to you by Foodista. Taking all factors into account, this recipe <b>earns a spoonacular score of 88%</b>, which is tremendous. Users who liked this recipe also liked <a href=\\"https://spoonacular.com/recipes/chicken-pho-with-daikon-noodles-1314129\\">Chicken Pho with Daikon Noodles</a>, <a href=\\"https://spoonacular.com/recipes/easy-pho-with-daikon-noodles-679671\\">Easy Pho with Daikon Noodles</a>, and <a href=\\"https://spoonacular.com/recipes/chicken-pho-with-daikon-noodles-629688\\">Chicken Pho with Daikon Noodles</a>.
                """);

        List<String> cuisines = new ArrayList<>();
        cuisines.add("Vietnamese");
        cuisines.add("Asian");
        recipe.setCuisines(cuisines);

        List<String> dishTypes = new ArrayList<>();
        dishTypes.add("soup");
        dishTypes.add("lunch");
        dishTypes.add("main course");
        dishTypes.add("main dish");
        dishTypes.add("dinner");
        recipe.setDishTypes(dishTypes);

        List<String> diets = new ArrayList<>();
        diets.add("gluten free");
        diets.add("dairy free");
        recipe.setDiets(diets);

        List<String> occasions = new ArrayList<>();
        recipe.setOccasions(occasions);

        recipe.setInstructions("""
                <ol><li>Place the sirloin steak in the freezer for 15 minutes for easy slicing.</li><li>In the meantime, use a spiralizer or a julienne peeler to make zucchini noodles. Divide the zoodles in two large serving bowls.</li><li>In a medium saucepan, toast cinnamon sticks, star anise, and cloves over medium heat until fragrant. </li><li>Add bone broth in the pan, followed by ginger, soy sauce and fish sauce. </li><li>Bring to a boil and simmer for 10 minutes to allow the spices to fully infuse the broth.</li><li>Take the beef out of your freezer and slice it into thin strips. </li><li>Divide the beef into two portions and add on top of the zoodles in the serving bowls.</li><li>Once the broth is done, also divide it into two portions and pour the hot broth into the serving bowls. The beef will start cooking instantly and the color changes.</li><li>Top the pho with bean sprouts, fresh herbs, sliced jalapeno pepper and green onion, drizzle with Sriracha or/and hoisin sauce, squeeze some lime juice in it and slurp up!</li></ol>
                """);

        return recipe;
    }
}
