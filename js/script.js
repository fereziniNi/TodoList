let form = document.querySelector("#addForm");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  // Enviar dados para Adicionar.php
  try {
    let titulo = document.querySelector("#inputTitle").value;
    let desc = document.querySelector("#inputDesc").value;

    const res = await fetch("include/adicionar.php", {
      method: "POST",
      body: JSON.stringify({ "titulo": titulo, "desc": desc }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const output = await res.json();
    // Resposta do PHP
    if (output.message) {
      document.querySelector("#inputDesc").value = "";
      document.querySelector("#inputTitle").value = "";
      alert(output.message); 
      getTarefas();
      document.getElementById("modal").style.display = "none"; 
    } else {
      alert("Erro: " + output.error); 
    }

  } catch (error) {
    console.error("Erro ao converter JSON:", error.message);
  }
});

// Listagem de Tarefas
const getTarefas = async () => {
  try {
    const divPai = document.querySelector("#list");
    divPai.innerHTML = "";

    const res = await fetch("include/select.php", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const output = await res.json();
    if (output.empty === "empty") {
      divPai.innerHTML = "<h2 class='notFound'>Nenhuma tarefa foi encontrada...</h2>";
    } else {
      // Criando Lista de atividades que não foram completas/realizadas
      output.forEach((tarefa) => {
        const tarefaContainer = document.createElement("div");
        tarefaContainer.className = "tarefaListada";
        
        const idInput = document.createElement("input");
        idInput.type = "hidden";
        idInput.id = "idInput";
        idInput.textContent = tarefa.id;

        const btnCheck = document.createElement("button");
        btnCheck.className = "btnTarefa";
        btnCheck.innerHTML =
          '<img src="css/circulo.png" alt="check image" class="checkimg">';
        // Botão para completar a atividade
        btnCheck.onclick = async () => {
            await terminarAtividade(tarefa.id);
        };

        const titleTarefa = document.createElement("label");
        titleTarefa.className = "titleTarefa";
        titleTarefa.textContent = tarefa.title;

        const titleDesc = document.createElement("label");
        titleDesc.className = "titleDesc";
        titleDesc.textContent = tarefa.description;

        const btnConfig = document.createElement("button");
        btnConfig.type = "button";
        btnConfig.className = "btnTarefa config-btn";
        btnConfig.id = tarefa.id;
        btnConfig.innerHTML =
          '<img src="css/config.png" alt="Imagem Config" class="configImg">';

        tarefaContainer.appendChild(btnCheck);
        tarefaContainer.appendChild(titleTarefa);
        tarefaContainer.appendChild(titleDesc);
        tarefaContainer.appendChild(btnConfig);

        divPai.appendChild(tarefaContainer);
      });
    }
  } catch (error) {
    console.error("Erro ao carregar tarefas:", error);
  }
};

// Atualizando lista(Ao abrir site)
getTarefas();

// Abrindo Modal(Edit Page)
document.querySelector("#list").addEventListener("click", (event) => {
  const configButton = event.target.closest(".config-btn");

  if (configButton) {
    const modal = document.getElementById("modal");
    modal.style.display = "flex";
    const id = configButton.id;
    editTarefas(id);
  }
});

// Fechando Modal
window.addEventListener("click", (event) => {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Recuperando dados para o Modal(Edit page)
const editTarefas = async (id) => {
  const res = await fetch(`include/alter.php?id=${id}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const output = await res.json();
  if (output.empty !== "empty") {
    for (var i in output) {
      // Informações sobre a atividade
      document.querySelector("#inputIdEdit").value = output[i].id;
      document.querySelector("#inputTitleEdit").value = output[i].title;
      document.querySelector("#inputDescEdit").value = output[i].description;
    }
  }
};

//Atualizar atividade(Titulo/descricao)
let update = document.querySelector("#editTarefa");
update.addEventListener("click", async (event) => {
  event.preventDefault();

  try {
    // Recuperando campos do Modal
    let id = document.querySelector("#inputIdEdit").value;
    let titulo = document.querySelector("#inputTitleEdit").value;
    let desc = document.querySelector("#inputDescEdit").value;
    console.log(id +"||"+ titulo+"||"+desc);
    const res = await fetch("include/update.php", {
      method: "POST",
      body: JSON.stringify({
        "id": id,
        "title": titulo,
        "desc": desc
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const output = await res.json();
    if (output.message) {
      alert(output.message);
      getTarefas();
      document.getElementById("modal").style.display = "none";
    } else {
      alert("Erro: " + output.error);
    }
  } catch (error) {
    console.error("Erro ao converter JSON:", error.message);
  }
});

// Deletando atividade
let deleteBtn = document.querySelector(".deleteBtn");

deleteBtn.addEventListener("click", async (event) => {
  event.preventDefault();

  const id = document.querySelector("#inputIdEdit").value;

  try {
    const res = await fetch(`include/delete.php?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const output = await res.json();

    if (output.message) {
      alert(output.message); 
      getTarefas();
      document.getElementById("modal").style.display = "none"; 
    } else {
      alert("Erro: " + output.error); 
    }
  } catch (error) {
    console.error("Erro ao processar a solicitação de exclusão:", error.message);
  }
});

// Finalizando a atividade(Completa)
const terminarAtividade = async (id) => {
  event.preventDefault();

  try {
    const res = await fetch(`include/done.php?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const output = await res.json();

    if (output.message) {
      alert(output.message);
      getTarefas();
    } else {
      alert("Erro: " + output.error);
    }
  } catch (error) {
    console.error("Erro ao processar a solicitação de exclusão:", error.message);
  }
};
