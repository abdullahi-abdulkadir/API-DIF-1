function request(obj){
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(obj.method, obj.url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(new Error(`HTTP error! status: ${xhr.status}`));
            }
        };

        xhr.onerror = () => reject(new Error("Network error"));

        xhr.send(obj.method === "GET" ? null : JSON.stringify(obj.body));
    });
};

let object = {
    url: "https://jsonplaceholder.typicode.com/todos",
    // url: "./data.json",
    method: "GET",
    body: null
};

const todo = document.querySelector(".todos");


async function getTodos() { 

try {
  
    const data = await request(object)
    todo.innerHTML = "";
    data.slice(0, 10).forEach(item => {
        let li = document.createElement("li");
        li.innerHTML = `${item.id} - ${item.title} - Completed: ${item.completed}`;
        todo.appendChild(li);
    });
    console.log(data);
}catch (error) {
    console.error("Error:", error);
  }
}

getTodos();







// request(object)
//     .then(data => result(data))
//     .catch(error => console.error("Error:", error));
