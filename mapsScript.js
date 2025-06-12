function initMap() {
  // Coordenadas do centro do mapa
  const center = { lat: -5.1871, lng: -37.347325 };

  // Criar mapa
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: center,
    styles: [
      {
        featureType: "poi",
        stylers: [{ visibility: "off" }],
      },
    ],
  });

  // Locais especiais
  const locations = [
    {
      position: { lat: -5.190329, lng: -37.343551 },
      title: "Colégio Sagrado Coração de Maria",
      moment: "inicio de tudo",
      icon: "https://maps.google.com/mapfiles/ms/icons/red-dot.png", // vermelho
    },
    {
      position: { lat: -5.172114, lng: -37.376804 },
      title: "Mossoró West Shopping",
      moment: "inicio do namoro",
      icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png", // azul
    },
    {
      position: { lat: -5.209774, lng: -37.326769 },
      title: "Residencial Dolce Vita",
      moment: "primeiro beijo",
      icon: "https://maps.google.com/mapfiles/ms/icons/green-dot.png", // verde
    },
    {
      position: { lat: -5.170089, lng: -37.348659 },
      title: "Residencial Rubens Pinto",
      moment: "primeira surpresa que voce fez pra mim",
      icon: "https://maps.google.com/mapfiles/ms/icons/purple-dot.png", // roxo
    },
    {
      position: { lat: -5.196291, lng: -37.342281 },
      title: "Studio Antigo",
      moment: "primeiro presente que eu dei",
      icon: "https://maps.google.com/mapfiles/ms/icons/pink-dot.png", // rosa
    },
    {
      position: { lat: -5.170271, lng: -37.371097 },
      title: "Casa de Mari",
      moment: "primeira dormida juntos",
      icon: "https://maps.google.com/mapfiles/ms/icons/orange-dot.png", // laranja
    },
    {
      position: { lat: -5.213957, lng: -37.317268 },
      title: "Dona Helenita",
      moment: "primeiro Natal",
      icon: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png", // amarelo
    },
    {
      position: { lat: -4.505337, lng: -37.725485 },
      title: "Canoa",
      moment: "primeira viagem sozinhos",
      icon: "https://maps.google.com/mapfiles/ms/icons/ltblue-dot.png", // ciano
    },
  ];

  // Adicionar marcadores
  locations.forEach((location) => {
    new google.maps.Marker({
      position: location.position,
      map: map,
      title: location.title,
      icon: location.icon,
    });
  });
}
