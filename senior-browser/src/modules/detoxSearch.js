// List of negative words
const Words = [
    "abuse", "accident", "aging", "alone", "anxiety", "apocalypse", "bad",
    "bankruptcy", "battle", "betrayal", "crisis", "death", "despair", "disaster",
    "divorce", "doom", "doubt", "fear", "fired", "fraud", "gloom", "grief", "hate",
    "hopeless", "injury", "isolation", "jeopardy", "loss", "murder", "neglect",
    "pain", "panic", "paranoia", "regret", "riot", "robbery", "sad", "scam",
    "scandal", "stress", "struggle", "suffering", "suicide", "terror", "tragedy",
    "violence", "war", "worry", "end of the world", "catastrophic event",
    "health crisis", "loneliness epidemic", "negative impact", "social isolation",
    "mental breakdown", "financial ruin", "heartbreak", "unemployment rate rises",



    "recession", "inflation", "debt crisis", "stock market crash", "economic collapse", 
    "job cuts", "layoffs", "corruption", "political unrest", "protests", 
    "civil war", "coup", "sanctions", "government collapse", "oppression", 
    "discrimination", "hate crime", "genocide", "human trafficking", "war crime", 
    "famine", "drought", "refugee crisis", "displacement", "forced migration","raped","attack",

    
     "global warming", "natural disaster", "earthquake", "tsunami", 
    "flood", "hurricane", "wildfire", "volcanic eruption", "oil spill", 
    "deforestation", "biodiversity loss", "extinction", "habitat destruction", 
    "pollution", "ozone depletion", "acid rain", "environmental degradation", 
    "melting glaciers", "rising sea levels", "water scarcity", "fossil fuel dependency","crime",
    
    "pandemic", "epidemic", "outbreak", "disease", "infection", "virus", "cancer", 
    "cholera", "Ebola", "HIV", "AIDS", "malaria", "influenza", "fever", 
    "chronic illness", "mental illness", "depression", "PTSD", "self-harm", 
    "overdose", "substance abuse", "addiction", "drug trafficking", "alcoholism", 
    "obesity crisis", "malnutrition", "public health emergency", "healthcare crisis",
    
    
    "poverty", "homelessness", "income inequality", "racial injustice", 
    "gender inequality", "child labor", "domestic violence", "sexual harassment", 
    "slavery", "mass incarceration", "police brutality", "displacement", 
    "refugee camps", "detention centers", "broken justice system", 
    "youth unemployment", "crime wave", "gun violence", "school shootings", 
    "assault", "sexual assault", "terrorism", "radicalization", "human rights violations",
    
    "desperation", "hopelessness", "frustration", "helplessness", "rejection", 
    "loneliness", "worthlessness", "despondency", "shame", "guilt", "misery", 
    "anguish", "grief", "sorrow", "self-doubt", "insecurity", "abandonment", 
    "breakdown", "emotional turmoil", "trauma", "post-traumatic stress", 
    "fear of failure", "low self-esteem", "identity crisis", "existential crisis",
    
    "arms race", "military conflict", "bombing", "airstrike", "missile attack", 
    "occupation", "invasion", "terror cell", "genocide", "nuclear war", 
    "chemical attack", "biological weapons", "massacre", "hostage situation", 
    "insurgency", "guerilla warfare", "siege", "peace talks fail", "refugee exodus",
    
    "cancel culture", "outrage", "online backlash", "doxxing", "public shaming", 
    "social media addiction", "echo chamber", "polarization", "fake accounts", 
    "online scam", "hate speech", "trolling", "misrepresentation", "division", 
    "mob mentality", "toxic community", "deplatforming","dead","killed",

    "aging", "dementia", "Alzheimer's", "arthritis", "osteoporosis", "chronic illness", 
    "heart disease", "stroke", "diabetes", "cancer", "hypertension", "hearing loss", 
    "vision loss", "depression", "mental illness", "anxiety", "chronic pain", 
    "disability", "mobility issues", "frailty", "falls", "injury", "isolation", 
    "loneliness epidemic", "neglect", "elder abuse", "hospitalization", "nursing home abuse", 
    "end-of-life care", "hospice", "terminal illness", "memory loss", "cognitive decline", 
    "disorientation", "confusion", "dependence on others", "bedridden", 
    "long-term care", "limited mobility", "loss of autonomy", "caregiver stress", 
    "healthcare crisis", "medication dependency", "elderly neglect", "infection risk", 
    
    "loneliness", "social isolation", "loss of friends", "death of spouse", "grief", 
    "bereavement", "family estrangement", "lack of community support", "ageism", 
    "discrimination against elderly", "feeling of abandonment", "worthlessness", 
    "helplessness", "low self-esteem", "emotional turmoil", "depression in old age", 
    "feeling forgotten", "fear of death", "fear of burdening others", "existential crisis", 

    "murder", "homicide", "stabbing", "shooting", "gun violence", "school shootings", 
    "mass shooting", "terrorism", "terrorist attack", "bombing", "explosion", 
    "car accident", "hit-and-run", "fatal accident", "road rage", "armed robbery", 
    "burglary", "assault", "sexual assault", "physical abuse", "domestic violence", 
    "rape", "kidnapping", "abduction", "human trafficking", "gang violence", 
    "organized crime", "drug cartel", "smuggling", "police brutality", "riot", 
    "civil unrest", "looting", "vandalism", "arson", "destruction of property", 
    "massacre", "genocide", "hate crime", "racial violence", "lynching", "hate group", 
    "violent protests", "civil war", "military conflict", "airstrike", "missile attack", 
    "bioterrorism", "chemical attack", "hostage situation", "public shooting", 
    "domestic terrorism", "vehicular assault", "drive-by shooting", "violent robbery", 
    "gang-related violence", "terror plot", "deadly force", "brutal attack", 
    "knife crime", "explosive device", "terror cell", "war crime", "atrocity", 
    "street violence", "random attack", "mob violence", "death toll", "gruesome murder", 
    "violent death", "assassination", "execution", "mugging", "home invasion", 
    "neighborhood shooting", "plane crash", "train derailment", "industrial accident", 
    "workplace violence", "mass casualty", "armed conflict","attack" ,"murderer",
];

// Function to blur news articles that contain negative words
const blurNegnews = () =>{
    const headlines = document.querySelectorAll(".n0jPhd.ynAwRc.MBeuO.nDgy9d");
    const newsDescription = document.querySelectorAll(".GI74Re.nDgy9d");
    const result = document.querySelectorAll('.iHxmLe'); 
      const result2 = document.querySelectorAll('.KYaZsb');
    const topHeadlines = document.querySelectorAll(".n0jPhd.ynAwRc.tNxQIb.nDgy9d"); 
    const topDescription = document.querySelectorAll(".SoAPf"); 
    const t = document.querySelectorAll(".b_algo"); 
    const v= document.querySelectorAll(".mc_vtvc b_canvas mc_vtvc_cc  creator"); 

    const allNewstext = [...headlines, ...newsDescription,  ...topDescription,...result,...result2,...t,...v];
    allNewstext.forEach((box) => {
        const newsText = box.innerText;
        if (containsNegtext(newsText)) {
            box.style.filter = "blur(8px)";
            box.style.transition = "filter 0.3s ease";
            const showButton = document.createElement("button");
            showButton.innerText = "Show Content";
            showButton.style.display = "block";
            showButton.style.margin = "10px auto";
            showButton.style.padding = "8px 16px";
            showButton.style.fontSize = "14px";
            showButton.style.cursor = "pointer";
            showButton.addEventListener("click", () => {
                box.style.filter = "none";  
                showButton.style.display = "none"; 
            });
            box.parentElement.appendChild(showButton); 
        }
    });
};
//window.addEventListener('load', blurNegnews );
// Function to hide negative content based on the negative words
function hideNegContent() {
        // Select various elements that may contain negative information
  //const results = document.querySelectorAll('.n0jPhd.ynAwRc.tNxQIb.nDgy9d, .SoAPf, .GI74Re.nDgy9d, .N54PNb,.N54PNb,article, h3, h4, h5, h6, .xrnccd, .VDXfz, .ZINbbc'); 
  const results = document.querySelectorAll(' .N54PNb,.N54PNb,article, h3, h4, h5, h6, .xrnccd, .VDXfz, .ZINbbc'); 
    results.forEach(res => {
        let hasNegWords = Words.some(word => {
            const regx = new RegExp(`\\b${word}\\b`, 'gi');// Create a regex for the word
            return regx.test(res.innerText);// Test if the word is in the element's text
        });
        if (hasNegWords) {// If negative words are found
            const prevtext = res.innerHTML;// Store the original content
            res.innerHTML = `
                <div class="negtextbox">
                  <strong>Website:</strong> <a href="${window.location.href}" target="_blank">${document.title}</a><br>
                    <span>This content may contain negative information.</span><br>
                    <button class="showcontent">Show Content</button>
                </div>`;
                // Add an event listener to the button to show the original content
     res.querySelector('.showcontent').addEventListener('click', function () {
                res.innerHTML = prevtext ; // Restore original content
            });
            res.classList.add('negative-content-processed');//processed neg text
        }
    });
}
// Create and append  styles for the page
const styleboxes = document.createElement('style');
styleboxes.innerHTML = `
    body {
        background-color: #f0f8ff; 
        font-family: Arial, sans-serif;
        color: #333; 
    }
    .negtextbox {
        background-color: white;
        border: 1px solid #ccc;
        padding: 10px;
        text-align: center;
        font-size: 1.1em;
        color: #555;
        margin: 10px 0;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .negtextbox button {
        margin-top: 10px;
        padding: 5px 10px;
        background-color: ##ff6a88;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }
    .negtextbox button:hover {
        background-color: #ff6a88;
    }
    .postivetext {
        text-align: center;
        padding: 10px;
        font-size: 1.5em;
        color: #add8e6;
    }
        .negtextbox .showcontent {
    color: #333; /* Set text color explicitly */
    background-color: #add8e6; /* Light blue background */
    border: none;
    border-radius: 3px;
    padding: 5px 10px;
    cursor: pointer;
    text-align: center;
    font-size: 14px;
}

.negtextbox .showcontent:hover {
    background-color: #87ceeb; /* Slightly darker blue on hover */
    color: #333; /* Ensure text color remains consistent */
}

`;
document.head.appendChild(styleboxes);
const positiveMsg = document.createElement('div');
positiveMsg.className = 'postivetext';
document.body.prepend(positiveMsg);
//window.onload = hideNegContent;
// Function to check if a text contains any negative words
const containsNegtext = (txt) => {
    return Words.some((word) => txt.toLowerCase().includes(word));
};
