const form = document.getElementById("searchForm");
const resultTableBody = document.querySelector("#resultTable tbody");

function handleSearch(event) {
  event.preventDefault();

  const year = form.elements.year.value;
  const inspectorId = form.elements.inspectorId.value;
  const status = form.elements.status.value;
  const showDescription = form.elements.showDescription.checked;
  const showComments = form.elements.showComments.checked;
  const showOrdinance = form.elements.showOrdinance.checked;
  const showBureau = form.elements.showBureau.checked;

  // Clear the table body
  resultTableBody.innerHTML = "";

  // Fetch data from the API based on form inputs
  fetch("api-url-goes-here")
    .then((response) => response.json())
    .then((data) => {
      // Filter the data based on the form inputs
      const filteredData = data.filter((violation) => {
        const violationYear = violation.violation_date.substr(0, 4);
        return (
          violationYear === year &&
          violation.inspector_id === inspectorId &&
          violation.violation_status === status
        );
      });

      // Create table rows for the filtered data
      filteredData.forEach((violation) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${violation.id}</td>
          <td>${violation.violation_code}</td>
          <td>${violation.violation_location}</td>
          <td>${violation.violation_last_modified_date}</td>
          <td>${violation.human_address}</td>
          <td class="hidden">${showDescription ? violation.violation_description : ""}</td>
          <td class="hidden">${showComments ? violation.violation_inspector_comments : ""}</td>
          <td class="hidden">${showOrdinance ? violation.violation_ordinance : ""}</td>
          <td class="hidden">${showBureau ? violation.department_bureau : ""}</td>
        `;
        resultTableBody.appendChild(row);
      });
    });
}

form.addEventListener("submit", handleSearch);
