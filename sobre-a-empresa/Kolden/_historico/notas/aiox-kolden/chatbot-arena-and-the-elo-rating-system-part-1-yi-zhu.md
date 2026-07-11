---
id_fonte: "22bf1c9e-2793-457d-8c44-ce093dcf25b6"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Chatbot Arena and the Elo rating system - Part 1 - Yi Zhu"
tipo: "unknown"
url_original: "https://bryanyzhu.github.io/posts/2024-06-20-elo-part1/"
keywords: "('Chatbot Arena', 'Elo rating system', 'LLM benchmarking', 'Pairwise comparison', 'Crowdsourced evaluation')"
summary: "The provided text explores how **Chatbot Arena** utilizes the **Elo rating system** to provide a credible, human-centered leaderboard for ranking large language models. Because traditional automated metrics struggle with the open-ended nature of AI responses, this platform relies on **crowdsourced pairwise comparisons** where anonymous models battle head-to-head. The author details the mathematical mechanics of the Elo system—traditionally used in chess—explaining how it converts these wins and losses into a **scalable and incremental ranking** based on expected outcomes. By comparing the system's update logic to **Stochastic Gradient Descent**, the article illustrates how the leaderboard \"learns\" a model's true skill level over time. Ultimately, the source serves as a technical primer on why this competitive framework is essential for maintaining an **impartial and dynamic evaluation** of rapidly evolving AI technologies."
extraido_em: "2026-06-30T16:18:44Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# Chatbot Arena and the Elo rating system - Part 1 - Yi Zhu

Chatbot Arena and the Elo rating system - Part 1 - Yi Zhu
\* Yi Zhu
\* Publications
\* Blogs
\* Talks
\* Activities
\* Awards

##### Yi Zhu

Cofounder at Boson AI
Follow
\* SF Bay Area
\* Email
\* Twitter
\* LinkedIn
\* Github
\* Google Scholar
\* Zhihu

### Chatbot Arena and the Elo rating system - Part 1

13 minute read
**Published:** June 20, 2024
Chatbot Arena, developed by members from LMSYS and UC Berkeley SkyLab, is a benchmark platform designed to evaluate large language models (LLMs) through anonymous, randomized battles in a crowdsourced environment. Launched in May 2023, it has been continuously updated to reflect the latest advancements in the field. The platform's leaderboard is widely regarded as one of the most credible sources for ranking LLMs. The screenshot below highlights the competitive landscape featuring major players in the LLM space.
A screenshot of the leaderboard of Chatbot Arena as of 06/20/2024
But how do we get this leaderboard? What exactly is the Arena Elo score? Is this ranking manually decided by a panel of experts? How can a newly released model get so many votes and climb the ranks so quickly? And why do people trust this leaderboard so much? The answer to all these questions lies in the Elo rating system, a fascinating method used to rank competitors in a variety of games and sports.
In this blog post, we'll dive into the Elo rating system and explore how it works. This is the first part of a series where we'll break down the basics and show you why it's such a popular way to rank players – and chatbots!

#### Why Elo rating system?

In the quest to identify the best models or to determine which ones outperform others, an impartial and reliable leaderboard becomes essential. One way to build such a leaderboard is if you can compute some metrics like accuracy and simply rank the models based on accuracy scores from high to low. Benchmarking LLMs, however, poses significant challenges due to the open-ended nature of user queries. Traditional metrics fall short in evaluating these models automatically, as they must account for numerous perspectives and the complexities of nuanced responses.
A screenshot of ChatGPT.com which shows the open-ended nature of user queries
While some literature suggests using AI models as judges—like the popular MTBench [1], which utilizes GPT-4 as the evaluator—this approach has limitations. AI judges often struggle to grasp the subtleties in long and complex responses, especially in real-world use cases. This is because they don't have feelings, motives and values like humans do. Simply put, they are not perfectly aligned with us yet. Thus, human evaluation remains indispensable. Platforms like Chatbot Arena leverage crowdsourcing to facilitate pair-wise comparisons, where models are pitted against each other in “battles” to determine which one performs better.
To convert these pair-wise comparisons into a meaningful ranking, we turn to the Elo rating system. The Elo rating system is particularly well-suited for this purpose due to its advantageous properties in benchmarking based on pairwise comparisons:
\* **Scalability:** The Elo rating system can handle a large number of models efficiently. It doesn't require extensive data for every possible model pair, making it feasible to benchmark numerous models.
\* **Incrementality:** New models can be evaluated with relatively few trials. This feature allows for quick integration and assessment of new entries into the ranking system.
\* **Unique Order:** The Elo system provides a clear, unique ranking for all models. For any two models, it can determine which one ranks higher or if they are tied, ensuring a straightforward and comprehensible leaderboard.
By leveraging the Elo rating system, we can maintain a dynamic and accurate leaderboard that reflects the performance of various models based on comprehensive pair-wise comparisons.

#### What is Elo rating system?

The Elo rating system is a widely recognized method for calculating the relative skill levels of players in zero-sum games, including chess, e-sports, and now, LLM evaluations. A zero-sum game, in game theory, is a situation where the total amount of resources available is fixed. Any gain by one player results in a loss by another player, meaning the sum of the gains and losses among all players is zero. For one player to succeed, others must fail.
The Queen's Gambit. Image source: tumblr
In the context of LLM competitions, the Elo rating system can be used to evaluate and rank models based on their performance in head-to-head comparisons. Intuitively, there are three steps:
1. **Initial Scores:** Every model starts with an initial score, commonly set at 1000.
1. **Competitions:** When two models compete, and model A's response is preferred over model B's response, model A “wins” and takes some points from model B.
1. **Score Adjustments:** After numerous matches, models that consistently perform well and align better with human preferences (e.g., like GPT-4) will have higher scores than their initial rating. Conversely, models that perform poorly will have lower scores, as they lose points to stronger models. This will naturally lead to the leaderboard ranking.
But how exactly this works? How many scores should model A take from model B? How does the system work for multiple models and update their rankings in a continuous and stable manner?

#### Dive deep into the Elo rating system

To answer the above questions, let's look at the simplest online linear update algorithm to compute Elo ratings. The python implementation can be seen below, which is borrowed from this notebook from Chatbot Arena.

```
def compute_online_elo(battles, K=4, SCALE=400, BASE=10, INIT_RATING=1000):
    rating = defaultdict(lambda: INIT_RATING)

    for rd, model_a, model_b, winner in battles[['model_a', 'model_b', 'winner']].itertuples():
        ra = rating[model_a]
        rb = rating[model_b]
        ea = 1 / (1 + BASE ** ((rb - ra) / SCALE))
        eb = 1 / (1 + BASE ** ((ra - rb) / SCALE))
        if winner == "model_a":
            sa = 1
        elif winner == "model_b":
            sa = 0
        elif winner == "tie" or winner == "tie (bothbad)":
            sa = 0.5
        else:
            raise Exception(f"unexpected vote {winner}")
        rating[model_a] += K * (sa - ea)
        rating[model_b] += K * (1 - sa - eb)
```

Given a collection of battle results battles , we loop through them to update models' rankings. For each battle, we first compute the expected outcome for each model, denoted as ea and eb . Then we compare these expected outcomes with the actual competition results sa , and update the models' ratings rating[model\_a] and rating[model\_b] respectively. There are two key parts we need to elaborate: (1) computing the expected outcome for each model, and (2) updating the models' ratings.

##### Computing the expected outcome for each model

First of all, why do we want to compute the expected outcome? The expected outcome is crucial because it allows us to quantify the probability of each model winning based on their current ratings. This probabilistic approach ensures that the rating adjustments are fair and proportional to the models' performance expectations. If a highly-rated model wins against a lower-rated model, the rating change should be smaller because the outcome is expected. Conversely, if an underdog wins, the rating change should be more significant, reflecting the surprising result. This will help to stabilize the ranking system. For example, GPT4 can win over most models in most cases, but given its expected win rate is high, the actual rating change is minimal. Otherwise, slightly stronger models would quickly achieve extremely high scores, while slightly weaker models would be quickly eliminated.
Second, why we use this formula to compute the expected outcome, e.g., the expected outcome of model A ea = 1 / (1 + BASE \*\* ((rb - ra) / SCALE)) ? This formula is derived from the logistic distribution and is designed to provide a smooth, continuous function that maps rating differences to probabilities of winning. Talking about probabilities, this implies that the value range for ea and eb is between 0 and 1.
\* When rb is much higher than ra , the denominator will become very large, which leads to a very small ea towards 0.
\* When rb is much lower than ra , this part BASE \*\* ((rb - ra) / SCALE) will become very small almost 0, so that the denominator will converge to 1. Then ea is simply 1, which is the upper bound.
\* When ra = rb , ea would be 1 / (1 + 1) = 0.5 , indicating an equal chance of winning.
To summarize, as the rating difference increases, the expected outcome skews towards the higher-rated model. The choice of BASE = 10 and SCALE = 400 is conventional and ensures that a rating difference of 400 points corresponds to a 10-to-1 expected win ratio. This scale factor makes the system intuitive and easy to interpret.

##### Updating the models' ratings

Once we have the expected outcomes and the actual results from the battles, we are able to update the models' ratings. The rating update formula is:

```
rating[model_a] = ra + K * (sa - ea)
```

where:
\* ra is the original rating of model A before the battle.
\* K indicates the maximum change in rating (commonly set to 32 for chess but can vary). The default value from Chatbot Arena sets K=4 because they want to make the Elo ratings more stable and less biased towards recent games. We will talk about this bias problem in just one minute.
\* sa represents the actual result after the game (1 for a win, 0.5 for a draw, 0 for a loss).
One interesting thing is if you look at the formula closely, you will find that the lower-rated player will also gain a few points from the higher-rated player in the event of a draw. This means that this rating system is self-correcting. Players whose ratings are too low or too high should, in the long run, do better or worse correspondingly than the rating system predicts and thus gain or lose rating points until the ratings reflect their true playing strength.
Another interesting point is, this formula looks very similar to the update rule used in Stochastic Gradient Descent (SGD). In SGD, the update rule is:

```
w' = w − η * ∇L(w)
```

where:
\* w represents the old model weights and w' represents the updated model weights
\* η is the learning rate
\* ∇L(w) is the gradient of the loss function with respect to the model parameters.
Comparatively, the Elo rating update rule can be seen as:
\* The rating of the model ra is analogous to the model parameters w in SGD
\* The scaling factor K is similar to the learning rate η , controlling the step size
\* The score difference sa - ea is akin to the gradient, representing the error between the actual (model prediction) and expected outcomes (ground truth).
This similarity illustrates how the Elo rating system can be viewed as an iterative optimization process. Just like in machine learning where models improve through training, the Elo rating system allows models to “learn” from each match, progressively refining their ratings.

#### Some notes

While the Elo rating system is widely used and effective in many contexts, there are some interesting notes worth discussing.

##### Is Elo ranking an absolute metric?

Elo ratings are comparative only, and are valid only within the rating pool in which they were calculated, rather than being an absolute measure of a player's strength. Your rating this year may not be the same as you rating next year, even your ability stays the same. A player with a high Elo ranking just means they are good in this pool, but not necessarily mean they are good universally.
The Queen's Gambit. Image source: yarn clips

##### Bias towards recent battles

In terms of the online linear update algorithm to compute Elo ratings, it is sensitive to recent results, because the ratings are updated sequentially, meaning each new result builds on the last updated rating. This sequential dependency can amplify the impact of recent results, especially if they deviate significantly from expected outcomes. This can lead to significant fluctuations in ratings if the rating update order is changed.
To demonstrate it, in the notebook from Chatbot Arena, they recompute Elo rating by using the reversed game order and observe significant difference due to online update of Elo which biases the recent games. We can see that when the order is reversed, the winner changes from gemini-1.5-pro-api-0409-preview to gpt-4o-2024-05-13 . The ratings of all other models are also changed significantly.
Online Elo ranking is not stable. Image source: notebook from Chatbot Arena

##### Sensitivity to matchmaking

The rating updates depend heavily on the matchmaking process. If matches are not balanced (e.g., pairing high-rated models against very low-rated models frequently), the ratings can become distorted. Hence, the matchmaking process should also be handled carefully.
Chatbot Arena mentioned that they had adopted several different matching and sampling algorithms. They employed uniform sampling as well as weighted sampling methods, which assign greater weights to better models. That is probably why we can see the new models like GPT-4o gets to the top of the leaderboard soon after its release.

#### Summary

So, next time you need to rank something and find yourself without a clear metric, remember the Elo rating system. It's a proven approach that can turn a series of individual comparisons into a meaningful and dynamic leaderboard.

#### References

[1] Zheng et al., Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena, NeurIPS 2023 Datasets and Benchmarks Track.
**Tags:** AI, Chatbot arena, Elo, LLM evaluation

###### Share on

Twitter Facebook LinkedIn Previous Next

###### You May Also Enjoy

#### Chatbot Arena and the Elo rating system - Part 2

14 minute read
**Published:** August 16, 2024
In our previous blog post on Elo rating system, we introduced the basics of the Elo rating system and its online linear update algorithm, hereafter referred to as “online Elo”. However, we identified a significant concern with online Elo: its instability and tendency to bias toward recent results. For example, a demonstration from Chatbot Arena showed substantial shifts in model ratings when Elo was recalculated using the reverse order of matches.
\* **Follow:**
\* GitHub
\* Feed
© 2025 Yi Zhu. Powered by Jekyll & AcademicPages, a fork of Minimal Mistakes.
