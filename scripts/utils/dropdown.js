const ingrBtn = document.querySelector("#ingrBtn");
const appBtn = document.querySelector("#appBtn");
const ustBtn = document.querySelector("#ustBtn");

const ingrDropdown = document.querySelector("#ingrDropdown");
const appDropdown = document.querySelector("#appDropdown");
const ustDropdown = document.querySelector("#ustDropdown");

function showDropdown() {
  ingrBtn.addEventListener("click", function () {
    ingrDropdown.classList.toggle("show");

    if (appDropdown.classList.contains("show")) {
      appDropdown.classList.remove("show");
    }

    if (ustDropdown.classList.contains("show")) {
      ustDropdown.classList.remove("show");

    }
  });

  appBtn.addEventListener("click", function () {
    appDropdown.classList.toggle("show");

    if (ingrDropdown.classList.contains("show")) {
      ingrDropdown.classList.remove("show");
    }

    if (ustDropdown.classList.contains("show")) {
      ustDropdown.classList.remove("show");
    }
  });


  ustBtn.addEventListener("click", function () {
    ustDropdown.classList.toggle("show");

    if (ingrDropdown.classList.contains("show")) {
      ingrDropdown.classList.remove("show");
    }

    if (appDropdown.classList.contains("show")) {
      appDropdown.classList.remove("show");
    }

  });
}
showDropdown();

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
/*     document.getElementById("myDropdown").classList.toggle("show");
 */  }

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction2() {
  document.getElementById("myDropdown2").classList.toggle("show");
}

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput2");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown2");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction3() {
  document.getElementById("myDropdown3").classList.toggle("show");
}

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput3");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown3");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}