import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
const router = Router();

let games = [
    {
        id: "adowb1b3bb",
        game: "League of Legends",
        description: "League of Legends is a team-based game with over 140 champions to make epic plays with."
    },
    {
        id: "kd7b9ks2nda",
        game: "PlayerUnknown's Battlegrounds",
        description: "PLAYERUNKNOWN'S BATTLEGROUNDS is a last-man-standing shooter being developed with community feedback."
    }
];

router.get('/get-all-games', (req, res) => {
    res.json(games);
});

router.get('/get-game-by-id/:id', (req, res) => {
    const game = games.find(g => g.id === req.params.id);
    if (game) {
        res.json(game);
    } else {
        res.status(404).json({ message: 'The game with the id does not exist, please check id' });
    }
});

router.post('/create-new-game', (req, res) => {
    const { game, description } = req.body;
    if (!game || !description) {
        return res.status(400).json({ message: 'cannot leave text area blank' });
    }
    if (games.find(g => g.game === game)) {
        return res.status(400).json({ message: 'Game already exists, cannot add game' });
    }
    const newGame = { id: uuidv4(), game, description };
    games.push(newGame);
    res.json(games);
});

router.put('/update-game/:id', (req, res) => {
    const { id } = req.params;
    const { game, description } = req.body;
    const existingGame = games.find(g => g.id === id);

    if (!existingGame) {
        return res.status(404).json({ message: 'game not found, cannot update' });
    }

    if (game) {
        if (game.trim() === '') {
            return res.status(400).json({ message: 'cannot update to empty values' });
        }
        existingGame.game = game;
    }

    if (description) {
        if (description.trim() === '') {
            return res.status(400).json({ message: 'cannot update to empty values' });
        }
        existingGame.description = description;
    }

    res.json(existingGame);
});

router.delete('/delete-game/:id', (req, res) => {
    const { id } = req.params;
    const gameIndex = games.findIndex(g => g.id === id);

    if (gameIndex === -1) {
        return res.status(404).json({ message: 'game not found, cannot delete' });
    }

    games.splice(gameIndex, 1);
    res.json({ message: 'Game deleted successfully' });
});

router.get('/get-game-by-name/:name', (req, res) => {
    const { name } = req.params;
    const game = games.find(g => g.game === name);

    if (game) {
        res.json(game);
    } else {
        res.status(404).json({ message: 'The game does not exist, please check name' });
    }
});

export default router;
