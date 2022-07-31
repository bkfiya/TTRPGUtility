namespace CardDraw
{
    public partial class Form1 : Form
    {
        public List<string> events = new List<string>() 
            { 
                "Zombie Ambush - Draw 2 minions (3 turns - loot if 1)"
                , "Trapped survivor - Draw 1 minion, must spend 2 actions to clear event (2 turns)"
                , "Glass shattered - Draw 3 minions (4 turns)"
            };
        public List<string> minions = new List<string>()
            { 
                "Zombie - 2 health, 1 damage"
                , "Zombie - 2 health, 1 damage"
                , "Zombie - 2 health, 1 damage"
                , "Zombie - 2 health, 1 damage"
                , "Zombie - 2 health, 1 damage"
                , "Zombie - 2 health, 1 damage"
                , "Zombie - 2 health, 1 damage"
                , "Zombie - 2 health, 1 damage"
                , "Zombie - 2 health, 1 damage"
                , "Zombie Dog - 2 health, 1 damage - -1 to dice on attacks against this enemy"
                , "Zombie Dog - 2 health, 1 damage - -1 to dice on attacks against this enemy"
                , "Zombie Dog - 2 health, 1 damage - -1 to dice on attacks against this enemy"
                , "Zombie Dog - 2 health, 1 damage - -1 to dice on attacks against this enemy"
                , "Licker - 3 health, 2 damage - in addition to damage, make a 4+ success roll. on a fail, you lose 1 action next turn"
                , "Licker - 3 health, 2 damage - in addition to damage, make a 4+ success roll. on a fail, you lose 1 action next turn"
            };
        public List<string> behaviors = new List<string>()
            { 
                "Stalking - attacks character with least amount of aggro tokens"
                , "Defensive - once per turn will attempt to block attacks against another enemy"
                , "Normal - attack highest aggro", "Normal - attack highest aggro"
                , "Normal - attack highest aggro", "Normal - attack highest aggro"
                , "Normal - attack highest aggro", "Normal - attack highest aggro"
                , "Normal - attack highest aggro", "Normal - attack highest aggro"
                , "Normal - attack highest aggro", "Normal - attack highest aggro"
            };
        public List<string> minibosses = new List<string>()
            { "Giant Aligator - 6 health, 2 damage. if 3 actions are spent reduce enemy HP by 4." };
        public List<string> bosses = new List<string>()
            { "Mr. X - 10 health, 2 damage. Every turn he swaps between attacking the character with highest aggro vs lowest aggro, starting with lowest." };
        public List<string> loot = new List<string>()
            { 
                "Weapon: Shotgun - 2 damage, 5+"
                , "Sub Weapon: Knife - 1 damage, 5+. can be used instead of an armor roll when attacked."
                ,  "Armor: Increase max health by 2, in addition you can roll a 6+ armor save when you are attacked"
            };
        public Random rng = new Random();

        public Form1()
        {
            InitializeComponent();            
            Shuffle(events);
            updateButtonText("Event", events.Count(), button1);
            Shuffle(minions);
            updateButtonText("Minion", minions.Count(), button2);
            Shuffle(behaviors);
            updateButtonText("Behavior", behaviors.Count(), button5);
            Shuffle(minibosses);
            updateButtonText("Miniboss", minibosses.Count(), button3);
            Shuffle(bosses);
            updateButtonText("Boss", bosses.Count(), button4);
            Shuffle(loot);
            updateButtonText("Loot", loot.Count(), button6);
        }

        private void btnEvent(object sender, EventArgs e)
        {
            Draw(events, false);
        }

        private void btnMinion(object sender, EventArgs e)
        {
            Draw(minions, true);
        }

        private void btnBehavior(object sender, EventArgs e)
        {
            Draw(behaviors, true);
        }

        private void btnMiniboss(object sender, EventArgs e)
        {
            Draw(minibosses, false);
        }

        private void btnBoss(object sender, EventArgs e)
        {
            Draw(bosses, false);
        }

        private void btnLoot(object sender, EventArgs e)
        {
            Draw(loot, false);
        }

        private void updateButtonText(string deckName, int cards, Button button)
        {
            button.Text = $"Draw {deckName} ({cards})";
        }

        private void Draw(List<string> deck, bool putOnBottom)
        {
            var card = deck.First();
            deck.Remove(card);
            if (putOnBottom) deck.Add(card);
            txtBox.Text = card;
        }

        public void Shuffle(IList<string> list)
        {
            int n = list.Count;
            while (n > 1)
            {
                n--;
                int k = rng.Next(n + 1);
                string value = list[k];
                list[k] = list[n];
                list[n] = value;
            }
        }
    }
}