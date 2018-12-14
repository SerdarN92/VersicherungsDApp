# Anleitung:

- Ganache installieren und ausführen (https://truffleframework.com/ganache) 
- Truffle installieren (https://truffleframework.com/truffle)
- unter /VersicherunsgBackend/ethereum-bridge den Befehl npm install ausführen
- unter /VersicherungsBackend/ethereum-bridge den Befehl node bridge -a 9 -H 127.0.0.1 -p 7545 --dev ausführen
- Die Zeile OAR = OraclizeAddrResolverI(0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475); (mit anderer Adresse) kopieren und in der Datei /VersicherungsBackend/smart contracts/contracts/WeatherInsurance.sol ersetzen
- unter /VersicherungsBackend/smart contracts die Datei truffle-config.js anpassen (Adresse -> Adresse der Versicherung, network_id)
- unter /VersicherungsBackend/smart contracts den Befehl truffle migrate --network development --reset ausführen
- Adresse der InsuranceRegistry rauskopieren und in der Datei /VersicherungsDApp/src/app/provides/web3.service.ts ersetzen (Konstante insuranceRegistryAddress) 
- VersicherungsDApp mit dem Befehl ng serve -o im Ordner /VersicherungsDApp starten (vorher npm install ausführen) -> hier gibt es ab und zu Fehler beim Kompilieren. Einfach ein Leerzeichen hinzufügen und der Kompilierfehler verschwindet.


# Was zu Ändern ist:

- unter /VersicherungsBackend/backend-server/controller.js den API-KEY X-CMC_PRO_API_KEY ändern (kostenlosen Account erstellen auf coinmarketcap für die API)
- unter /VersicherungsBackend/smart contracts/contracts/WeatherInsurance.sol den REST-API-Link ändern (wird bald offline sein - eigener Server) 

# Wichtig:

- man kann mit dem Oraclize-Service über die Ethereum-Bridge keine lokal laufende REST-API anfragen, diese muss vom Internet erreichbar sein