# CheerWave

## Overview

- A content creator support platform.
- Users select their favorite creators and enter the following
  - Which tokens do you want to support?
  - How many tokens to support?
  - How long will the tokens be distributed?
  - What is the distribution interval?
- The funds will be automatically transferred to the target creators on a regular basis using SuperFluid.
- The user can change the settings or terminate the support at any time.

## Why SuperFluid?

### If you want to support a creator, why not just send the funds in a lump sum?
- Regular payments motivate creators to continue their activities.
- On the other hand, users can terminate their support at any time if the creator is no longer active.

## There is Gitcoin.
- It is more flexible than Gitcoin.
- No complicated steps are required, as individuals can continuously donate as they wish, at any time they wish.

## Challenges.

### Identity verification

- Not sure if the person is who they say they are.
- Enable authentication and proof using ENS, DID, zero-knowledge proof, etc.

## The Graph

- CheerWave uses The Graph to efficiently capture event data.
- Use it to quickly notify the front end that a creator or user is starting/stopping assistance to a creator.
- We decided to use The Graph because we want to notify the front end with as much real-time information as possible.
- Also, by being able to pass information to the front end in real time, we believe that the application itself will be able to do more, and we can look forward to future extensibility.
