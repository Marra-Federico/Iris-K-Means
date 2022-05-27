var canvas = document.getElementById("IrisCanvas");
var ctx = canvas.getContext("2d");
              //Red     //Blue     //Green
var colore = ["#FF0000", "#0000FF", "#00FF00"];
var precisione = [];
var assegnamento = [];
var centroideo = [];
var ndim = 4;
//Function to create points and centroids
function crea()
{
    var punti = [];
    for (var i = 0; i < dataset.length; i++) //Creation points
    {
        punti.push({
            x: dataset[i].SepalLengthCm * 100 - 400,
            y: 600 - dataset[i].SepalWidthCm * 100 - 100,
            z: dataset[i].PetalLengthCm * 100 - 200,
            w: dataset[i].PetalWidthCm * 100 -100
        });
    }
    var distanzai;
    var min = Infinity;
    var max = -Infinity;
    var xmin, xmax, ymin, ymax, zmax, zmin, wmax, wmin;
    for (var i = 0; i < dataset.length; i++) //calculation the distance between points and centroids
    {
        if(ndim == 4)
        {
            distanzai = Math.sqrt(Math.pow(punti[i].x - 0, 2) + Math.pow(punti[i].y - 0, 2) + Math.pow(punti[i].z - 0, 2) + Math.pow(punti[i].w - 0, 2) );
        }
        else if(ndim == 2)
        {
            distanzai = Math.sqrt(Math.pow(punti[i].x - 0, 2) + Math.pow(punti[i].y - 0, 2));
        }
        else if(ndim == 3)
        {
            distanzai = Math.sqrt(Math.pow(punti[i].x - 0, 2) + Math.pow(punti[i].y - 0, 2) + Math.pow(punti[i].z - 0, 2));
        }
        else if(ndim == 1)
        {
            distanzai = Math.sqrt(Math.pow(punti[i].x - 0, 2));
        }

        if (distanzai < min) 
        {
            min = distanzai;
            xmin = punti[i].x;
            ymin = punti[i].y;
            zmin = punti[i].z;
            wmin = punti[i].w;
        }

        if (distanzai > max) 
        {
            max = distanzai;
            xmax = punti[i].x;
            ymax = punti[i].y;
            zmax = punti[i].z;
            wmax = punti[i].w;
            
        }
    }
    
    var centroide = [];
    for (var i = 0; i < 3; i++) //Creation centroids
    {
        centroide.push({
            x: Math.random() * (xmax - xmin) + xmin,
            y: Math.random() * (ymax - ymin) + ymin,
            z: Math.random() * (zmax - zmin) + zmin,
            w: Math.random() * (wmax - wmin) + wmin
        });
    }
    return {
        punti: punti,
        centroide: centroide,
    };
}

function disegna(punti, centroide)  //draw the centroids and the points
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < punti.length; i++) 
    {
        ctx.beginPath();
        ctx.arc(punti[i].x, punti[i].y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
    }
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(centroide[0].x, centroide[0].y, 8, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.arc(centroide[1].x, centroide[1].y, 8, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.arc(centroide[2].x, centroide[2].y, 8, 0, 2 * Math.PI);
    ctx.fill();
    //Assign the color of the cluster to the points associated
    for (var i = 0; i < punti.length; i++) 
    {
        ctx.beginPath();
        ctx.arc(punti[i].x, punti[i].y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = colore[punti[i].cluster];
        ctx.fill();
    }
}
function kmean_step(punti, centroide) 
{
    //Assign points to centroids
    for (var i = 0; i < punti.length; i++) 
    {
        var min_dist = Infinity;
        var min_index = -1;
        for (var j = 0; j < centroide.length; j++) 
        {
            if(ndim == 4)
            {
                var dist = Math.sqrt(
                    Math.pow(punti[i].x - centroide[j].x, 2) +
                    Math.pow(punti[i].y - centroide[j].y, 2) +
                    Math.pow(punti[i].z - centroide[j].z, 2) +
                    Math.pow(punti[i].w - centroide[j].w, 2)
                );
            }
            else if (ndim == 2)
            {
                var dist = Math.sqrt(
                    Math.pow(punti[i].x - centroide[j].x, 2) +
                    Math.pow(punti[i].y - centroide[j].y, 2)
                );
            }
            else if(ndim == 3)
            {
                var dist = Math.sqrt(
                    Math.pow(punti[i].x - centroide[j].x, 2) +
                    Math.pow(punti[i].y - centroide[j].y, 2) +
                    Math.pow(punti[i].z - centroide[j].z, 2) );
            }
            else if(ndim == 1)
            {
                var dist = Math.sqrt( Math.pow(punti[i].x - centroide[j].x, 2));
            }

            if (dist < min_dist) 
            {
                min_dist = dist;
                min_index = j;
            }
        }
        punti[i].cluster = min_index; 
    }

    centroideo = JSON.parse(JSON.stringify(centroide));
    //Update the position of centroids
    for (var i = 0; i < centroide.length; i++) 
    {
        var sommax = 0;
        var sommay = 0;
        var sommaz = 0;
        var sommaw = 0;
        var cont = 0;
        for (var j = 0; j < punti.length; j++) 
        {
            if (punti[j].cluster == i) 
            {
                sommax += punti[j].x;
                sommay += punti[j].y;
                sommaz += punti[j].z;
                sommaw += punti[j].w;
                cont++;
            }
        }
        centroide[i].x = sommax / cont;
        centroide[i].y = sommay / cont;
        centroide[i].z = sommaz / cont;
        centroide[i].w = sommaw / cont;
        
    }
    //Check if centroids don't move 
    if( controllaCentroide(centroideo, centroide))
    {
        clearInterval(interval);
        document.getElementById('stampa').innerHTML = "aggiornamento centroidi concluso";
        disegna(punti,centroide);
    }
    for(var i = 0 ; i < 3 ; i++)
    {
        var setosa = 0, versicolor = 0, virginica = 0;
        for(var j = 0 ; j < dataset.length ; j++)
        {
            if(punti[j].cluster == i)
            {
                if(dataset[j].Species == "Iris-setosa")
                    setosa++;
                else if(dataset[j].Species == "Iris-versicolor")
                    versicolor++;
                else
                    virginica++;
            }
        }
        if( setosa > virginica && setosa > versicolor )//precision of cluster
        {
            precisione[i] = setosa / (setosa+versicolor+virginica);
            assegnamento[i] = "Setosa";
        }
        else if (virginica > setosa && virginica > versicolor)
        {
            precisione[i] = virginica / (setosa+versicolor+virginica);
            assegnamento[i] = "Virginica";
        }
        else if(versicolor > setosa && versicolor > virginica)
        {
            precisione[i] = versicolor / (setosa+versicolor+virginica);
            assegnamento[i] = "Versicolor";
        }
        
    }
    console.log("Accuracy  è " + (precisione[0]+precisione[1]+precisione[2])/3 );
}

function controllaCentroide(centroideo , centroide) //check if the centroids don't move
{
    for(var i = 0 ; i < 3 ; i++)
    {
        if( centroideo[i].x == centroide[i].x && centroideo[i].y == centroide[i].y && centroideo[i].z == centroide[i].z && centroideo[i].w == centroide[i].w)
        {
            continue;
        }
        else
        {
            return false;
        }
    }
    return true;
}

let { punti, centroide } = crea();

disegna(punti, centroide);

var interval = setInterval(() => {
    kmean_step(punti, centroide)
    setTimeout(() => {
        disegna(punti, centroide)
    }, 500)
}, 1)
