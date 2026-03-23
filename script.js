document.addEventListener('DOMContentLoaded', function() {
    const flavoursContainer = document.getElementById('flavours-container');
      const detailsContent = document.getElementById('details-content');

    fetch('data.json')
        .then(response => response.json())
         .then(data => {
            const flavors = data.topFlavors;

            flavors.forEach(flavor => {
                const btn = document.createElement('button');
                 btn.textContent = flavor.name;
                   btn.classList.add('flavour-btn');
           
                   btn.addEventListener('click', () => {
                      showDetails(flavor);
             
                     });
                flavoursContainer.appendChild(btn);
                 });
           })
          .catch(error => {
              console.error('error occured loading JSON:', error);
              detailsContent.innerHTML = '<p>Failed to load flavor data.</p>';
          });

    function showDetails(flavor) {
         
          let calorieMessage = '';
 
        if (flavor.calories > 350) {
            calorieMessage = 'High calories!';
          }  else if (flavor.calories < 300) {
               calorieMessage = 'Light option.';
         }     else {
             calorieMessage = 'Moderate calories.';
          }
         let typeEmoji = '';

          if (flavor.type === 'ice cream') {
            typeEmoji = 'icecream';
          }  else if (flavor.type === 'sorbet') {
            typeEmoji = 'sorbet';
        } else {
             typeEmoji = 'sherbet';
          }
 
        const html = `
            <h3>${flavor.name}</h3>
            <img src="${flavor.image}" alt="${flavor.name}">
                <p><strong>Type:</strong> ${typeEmoji} ${flavor.type} <span class="type-badge">${flavor.type}</span></p>
             <p><strong>Calories:</strong> <span class="${flavor.calories > 350 ? 'calorie-high' : ''}">
               ${flavor.calories} kcal</span> ${calorieMessage}</p>
             <p><strong>Ingredients:</strong> ${flavor.ingredients.join(', ')}</p> `;
      
             detailsContent.innerHTML = html;
    }
});