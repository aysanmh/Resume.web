//scroll : 

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.list');
  const container = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    const scrollTop =  document.documentElement.scrollTop;
    const containerHeight = container.offsetHeight;

    buttons.forEach((button, index) => {
      const buttonPosition = (index) * 750;
      if (scrollTop >= buttonPosition) {
        button.style.backgroundColor = 'rgb(253, 186, 20)';
      } else {
        button.style.backgroundColor = 'rgb(17,17,17)';
      }
    });
  });
});
 //lightgallery: 

 document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery");
  const categories = {
    logo: ['LOGO'],
    video: ['VIDEO'],
    graphic: ['GRAPHIC DESIGN'],
    mockup: ['MOCKUP'],
    all: ['LOGO', 'VIDEO', 'GRAPHIC DESIGN', 'MOCKUP']
  };

  fetch("https://jsonplaceholder.typicode.com/photos")
    .then(response => response.json())
    .then(photos => {
      const categorizedPhotos = photos.slice(0, 6).map((photo, index) => {
        const categoriesList = ['LOGO', 'VIDEO', 'GRAPHIC DESIGN', 'MOCKUP'];
        return {
          url: photo.url,
          thumbnailUrl: photo.thumbnailUrl,
          title: photo.title,
          category: categoriesList[index % categoriesList.length]
        };
      });

      const $grid = new Isotope(gallery, {
        itemSelector: 'a',
        layoutMode: 'fitRows'
      });

      const displayImages = (filter) => {
        gallery.innerHTML = '';
        categorizedPhotos.filter(photo => categories[filter].includes(photo.category))
          .forEach(photo => {
            const link = document.createElement("a");
            link.href = photo.url;

            const img = document.createElement("img");
            img.src = photo.thumbnailUrl;
            img.alt = photo.title;

            link.appendChild(img);
            gallery.appendChild(link);
          });

        $grid.arrange({ filter: `a[href*="${filter.toLowerCase()}"]` });

        lightGallery(gallery, {
          plugins: [lgThumbnail, lgZoom],
          thumbnail: true,
          zoom: true,
          dynamic: true,
          dynamicEl: categorizedPhotos.filter(photo => categories[filter].includes(photo.category))
            .map(photo => ({
              src: photo.url,
              thumb: photo.thumbnailUrl,
              subHtml: `<h4>${photo.title}</h4>`
            }))
        });
      };

      document.querySelectorAll('nav .n').forEach(item => {
        item.addEventListener('click', (e) => {
          const filter = e.target.id;
          displayImages(filter);
        });
      });

      displayImages('all');
    });
});

//rescipes: 

fetch('https://dummyjson.com/recipes')
      .then(response => response.json())
      .then(data => {
        
        const recipes = data.recipes;
       
        const recipesContainer = document.getElementById('recipes-container');

      
        recipes.forEach(recipe => {
          
          const recipeDiv = document.createElement('div');
          recipeDiv.classList.add('recipe');

         
          recipeDiv.innerHTML = `
            <h2>${recipe.name}</h2>
            <img src="${recipe.image}" alt="${recipe.name}">
            <p>Difficulty: ${recipe.difficulty}</p>
            <p>Cuisine: ${recipe.cuisine}</p>
            <p>Rating: ${recipe.rating}</p>
            <p>Review Count: ${recipe.reviewCount}</p>
            <hr>
          `;

          
          recipesContainer.appendChild(recipeDiv);
        });
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
      });

