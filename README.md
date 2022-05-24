# Iris-K-Means
Simple K-Means algorithm of Machine Learning 

# Description
This project aim to a classification of various classes of plants using the K-Means method, in this program we have 3 different class of plants, so we've used 3 centroids to classify them. 

Every single element of the dataset is positioned on a canvas chart, using its characteristics as coordinates (every element has 4 characteristics), and consequently each centroid is randomly positioned within the range of points, to make sure that all are associated with at least one point.

To associate a centroid to the corresponding points, we calculate its point-centroid distance, and assign the point to the centroid with the shortest distance, after doing this we update the position of the centroid, calculating the average of the coordinates of the associated points, and at this point we recalculate the distances and reassociate the points to their own centroids until the latter no longer change their position.

Now we check which class the centroid refers to, simply by assigning it the majority class of the points associated with it, and finally we check if the program is effective, checking how many elements really represent the class of the centroid to which they have been associated, We have obtained the greatest accuracy, or about 91%, using a 4d graph, you can change the number of dimensions used in the program simply by changing the line:
```javascript
var ndim = 4;
```
# Project Structure
The project is divided in 3 files:
 * `dataset.js`: contains all the elements of the project, in this case all the plants, in our project we have 150 elements, 50 for each class
 * `iris.html`: contains the canvas element for displaying the result and links to various js files
 * `kmeans.js`: represents the code that allows the project to be carried out
# Run and Test
To start the project you need to open the file `iris.html` from which it will be possible to view the final result, and finally by going to the browser console it will also be possible to view its accuracy

# People
The people involved in the project are:
  * Riccardo Ventrici (https://github.com/v3ntri)
  * Marianna Mileo (https://github.com/merymylo)
  * Federico Marra (https://github.com/Marra-Federico)
  * Frank Dunkan (https://github.com/Fiokkodineve)
