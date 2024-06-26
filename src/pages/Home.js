import React, { useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { Table } from "../components/table";
import { TableContainer } from "../components/layout/ContainerTable";
import { createDeck, shuffleDeck } from "../components/deck";

import { ModalInput } from "../components/modal/ModalInputs";
import { BuyInButton, BuyInContainer, BuyInInput } from "../components/BuyIn";
import { PotMarker, PotMarkerContainer } from "../components/Pot";
import PlayerMarkers from "../components/PlayerMarkers";
import ModalIntro from "../components/modal/ModalIntro";
import MyNavbar from "../components/layout/MyNavBar";

function Home() {
  const [players, setPlayers] = useState([
    { id: 1, playerName: "One", buyChipsNum: "10" },
    { id: 2, playerName: "Two", buyChipsNum: "30" },
    { id: 3, playerName: "Three", buyChipsNum: "25" },
    { id: 4, playerName: "Four", buyChipsNum: "10" },
  ]);

  const [deck, setDeck] = useState([]);
  const [communityCards, setCommunityCards] = useState([]);

  const [show, setShow] = useState(true);
  const [showInputModal, setInputModal] = useState(false);
  const [showGameModal, setGameModal] = useState(false);

  const [dealPhase, setDealPhase] = useState(1);

  const [smallBlind, setSmallBlind] = useState("");
  const [bigBlind, setBigBlind] = useState("");

  const DealNewHand = () => {
    const newDeck = shuffleDeck(createDeck());
    const hand = newDeck.slice(0, 5);
    setDeck(newDeck.slice(5));
    console.log("Dealt hand:", hand);
    return hand;
  };

  const openInputModal = () => {
    setShow(false);
    setInputModal(true);
  };

  const openGameModal = () => {
    setShow(false);
    setGameModal(true);
  };

  const DealCards = () => {
    if (dealPhase <= 3) {
      let cardsToDeal;
      switch (dealPhase) {
        case 1:
          cardsToDeal = 3;
          break;
        case 2:
        case 3:
          cardsToDeal = 1;
          break;
        default:
          break;
      }

      setCommunityCards(communityCards.concat(deck.slice(0, cardsToDeal)));
      setDeck(deck.slice(cardsToDeal));
      setDealPhase(dealPhase + 1);
    } else {
      // Reset for the next round and deal new player hands
      setCommunityCards([]);
      setDealPhase(1);
      DealNewHand();
    }
  };

  const handleCloseInput = () => setInputModal(false);
  const handleCloseGame = () => setGameModal(false);

  return (
    <>
      <ModalIntro
        show={show}
        title={"Girl Meets Web Poker Club ♠️"}
        body={
          "  Welcome! Please decide if you would like to create a game or join a game using a code. Each game has a maximum of 8 players. - M"
        }
        footer={
          <>
            <Button variant="secondary" onClick={openInputModal}>
              Input Code
            </Button>
            <Button variant="primary" onClick={openGameModal}>
              Create a Game
            </Button>
          </>
        }
      />

      {/*Modal Input Code */}
      <ModalIntro
        show={showInputModal}
        onHide={handleCloseInput}
        title={"Input a Code"}
        body={
          <>
            <p className="mb-10">
              <b>Your Name</b>
            </p>
            <ModalInput onChange={(e) => setName(e.target.value)} />
            <p className="mt-20 mb-10">
              <b>Code</b>
            </p>
            <ModalInput onChange={(e) => setGameCode(e.target.value)} />
          </>
        }
        footer={
          <Button variant="primary" onClick={""}>
            Enter Game
          </Button>
        }
      />

      {/* Modal to Create a Game */}
      {/* <ModalInput
        show={showGameModal}
        onHide={handleCloseGame}
        title={"Create a Game"}
        body={
          <>
            <p className="mb-10">
              <b>Your Name</b>
            </p>{" "}
            <ModalInput onChange={(e) => setName(e.target.value)} />
            <p className="mt-20 mb-10">
              <b>Blinds (Chips)</b>
            </p>{" "}
            <InputGroup>
              <BlindInput
                placeholder="SB"
                onChange={(e) => setSmallBlind(e.target.value)}
              />{" "}
              <p className="mr-10 ml-10">
                <b>/</b>
              </p>{" "}
              <BlindInput
                placeholder="BB"
                onChange={(e) => setBigBlind(e.target.value)}
              />
            </InputGroup>{" "}
          </>
        }
      /> */}

      <MyNavbar />
      <Container>
        <TableContainer>
          <Row>
            <Table>
              <PotMarkerContainer>
                <PotMarker>
                  <p className="white">Pot: $0.00</p>
                </PotMarker>
                <Button
                  style={{
                    backgroundColor: "Green",
                    border: "none",
                    marginLeft: "20px",
                  }}
                  onClick={DealCards}
                >
                  Deal Cards
                </Button>
              </PotMarkerContainer>

              {communityCards.map((card, index) => (
                <>
                  <img
                    key={index}
                    src={require(`../components/cards/${card.value}_of_${card.suit}.png`)}
                    alt={`${card.value} of ${card.suit}`}
                    style={{
                      maxHeight: "185px",
                      marginRight: "10px",
                      marginTop: "20px",
                    }}
                  />
                </>
              ))}
            </Table>
          </Row>
        </TableContainer>
        <PlayerMarkers players={players} />
      </Container>
      <BuyInContainer>
        <BuyInInput type="number" placeholder="$10.00" />
        <BuyInButton>Buy In</BuyInButton>
      </BuyInContainer>
    </>
  );
}

export default Home;
