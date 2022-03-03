import { Component, OnInit } from '@angular/core';
import { Animal } from 'src/app/models/animal';
import { IStringMap } from 'src/app/utils/string-map';
import { AnimalService } from './animal.service';

@Component({
  selector: 'fe-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {

  public animalsByClass: IStringMap<Animal[]> = {};

  constructor(private animalService: AnimalService) {}

  public ngOnInit(): void {
    this.getAnimalsByContinent();
  }

  public getAnimalsByContinent(): void {
    this.animalService.getAnimalsByContinent()
      .subscribe((animals) => {
        this.animalsByClass = this.getAnimalsByClass(animals);
      });
  }

  // Transform the "animalsByContinent" object (see mock-animals.ts) so that animals
  // across every continent are organized by "class" and alphabetized by "name".
  // Remove any duplicates. Try to make the transformation efficient as you may have
  // to manipulate a very large dataset.
  //
  // The result should be an object with a single key for each distinct animal
  // class within the dataset (mammal, reptile, bird, etc.) Each of these class
  // keys should map to a list of animal objects of that class (see the adjacent
  // test file and view the getMockAnimalsByClass() function for an example).
  // These lists should not contain duplicates and should be alphabetized from
  // "A" to "z".
  public getAnimalsByClass(animals: IStringMap<Animal[]>): IStringMap<Animal[]> {
    // Add your code here.
    //used let to transform array
    let animalArray: Animal[] = [];
    const animalsByClass: IStringMap<Animal[]> = {};
    // brute force method
    // Loops through continents to create a new array of animals
    // using two loops to avoid O(n^2)
    for (const continent in animals) {
      animalArray = [...animalArray, ...animals[continent]]
    }
    // learned something new
    // filtered duplicates
    // sorting now to avoid multiple loops later
    animalArray = [...new Map(animalArray.map(v => [v.id, v])).values()].sort((a: Animal, b: Animal)=>{
      return a.name.localeCompare(b.name);
    });
    // loop through animals and organize by class,
    // if class does not exist within animalsByClass, then add new category
    for (let i = 0; i < animalArray.length; i++) {
      const animal = animalArray[i];
      const animalClass = animalArray[i].class;
      if (!animalsByClass[animalClass]) {
        animalsByClass[animalClass] = [animal];
      } else {
        animalsByClass[animalClass].push(animal)
      }
    }
    // Run `ng test` to see if your code passes.
    return animalsByClass;
    // I used a basic brute force method to solve the challenge.
    // I did make an effort to avoid any O(n^2) by separating the loops when necessary,
    // especially with regards to sorting and removing duplicates.
    // This challenge was fun because I found a new way to remove duplicate objects using Map!
    // I think the trade-off with using multiple loops is that I may be looping through the arrays too many times,
    // and with additional time I would try and find a way to reduce the amount of loops while still avoiding O(n^2).

    // My general coding breakdown was: first get a list of all animals into a singular array,
    // then remove any duplicate animals, then sort all of the animals in the array here,
    // to avoid having to sort multiple times later since we are going to be looping through this array anyway.
    // The final step was to create a new animalsByClass object, detect if that class already exists or not, then add the animals to the appropriate key through a loop.
    // Due to using the Map method of removing duplicates I had to separate the sort method, but I would probably try and find some way to reduce the amount of loops I was using if I had more time.

  }
}
