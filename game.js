async function loadPlayerData() {
    bridge.send("VKWebAppGetUserInfo").then(data => {
        console.log(data);
        document.getElementById("name").innerText = data.first_name+" "+data.last_name;
        document.getElementById("userPicture").src = data.photo_200;
    });

    let urlParams = new URLSearchParams(document.location.search);
    let response = await fetch("https://servermaksa.tk/yourcountryserver/getUser",
        {
            method: "POST",
            body: JSON.stringify({ id: urlParams.get("vk_user_id") })
        });

    if (response.ok) {
        let json = await response.json();
        console.log(json);
    } else {
        console.log(response);
    }

}