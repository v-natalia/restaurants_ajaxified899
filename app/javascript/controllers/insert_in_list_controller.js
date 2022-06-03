import { Controller } from "@hotwired/stimulus";
import { csrfToken } from "@rails/ujs";


export default class extends Controller {
  static targets = ["items", "form"];
  static values = { position: String }


  send(event) {
    event.preventDefault()

    // console.log("TODO: send request in AJAX")
      fetch(this.formTarget.action, {
        method: "POST",
        headers: { Accept: "application/json", "X-CSRF-Token": csrfToken() },
        body: new FormData(this.formTarget),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.inserted_item) {
            this.itemsTarget.insertAdjacentHTML(
              this.positionValue,
              data.inserted_item
            );
          }
          this.formTarget.outerHTML = data.form
        });
  }

  connect() {
    // console.log(this.element);
    // console.log(this.itemsTarget);
    // console.log(this.formTarget);

  }
}
