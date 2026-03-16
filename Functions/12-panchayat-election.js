/**
 * 🗳️ Panchayat Election System - Capstone
 *
 * Village ki panchayat election ka system bana! Yeh CAPSTONE challenge hai
 * jisme saare function concepts ek saath use honge:
 * closures, callbacks, HOF, factory, recursion, pure functions.
 *
 * Functions:
 *
 *   1. createElection(candidates)
 *      - CLOSURE: private state (votes object, registered voters set)
 *      - candidates: array of { id, name, party }
 *      - Returns object with methods:
 *
 *      registerVoter(voter)
 *        - voter: { id, name, age }
 *        - Add to private registered set. Return true.
 *        - Agar already registered or voter invalid, return false.
 *        - Agar age < 18, return false.
 *
 *      castVote(voterId, candidateId, onSuccess, onError)
 *        - CALLBACKS: call onSuccess or onError based on result
 *        - Validate: voter registered? candidate exists? already voted?
 *        - If valid: record vote, call onSuccess({ voterId, candidateId })
 *        - If invalid: call onError("reason string")
 *        - Return the callback's return value
 *
 *      getResults(sortFn)
 *        - HOF: takes optional sort comparator function
 *        - Returns array of { id, name, party, votes: count }
 *        - If sortFn provided, sort results using it
 *        - Default (no sortFn): sort by votes descending
 *
 *      getWinner()
 *        - Returns candidate object with most votes
 *        - If tie, return first candidate among tied ones
 *        - If no votes cast, return null
 *
 *   2. createVoteValidator(rules)
 *      - FACTORY: returns a validation function
 *      - rules: { minAge: 18, requiredFields: ["id", "name", "age"] }
 *      - Returned function takes a voter object and returns { valid, reason }
 *
 *   3. countVotesInRegions(regionTree)
 *      - RECURSION: count total votes in nested region structure
 *      - regionTree: { name, votes: number, subRegions: [...] }
 *      - Sum votes from this region + all subRegions (recursively)
 *      - Agar regionTree null/invalid, return 0
 *
 *   4. tallyPure(currentTally, candidateId)
 *      - PURE FUNCTION: returns NEW tally object with incremented count
 *      - currentTally: { "cand1": 5, "cand2": 3, ... }
 *      - Return new object where candidateId count is incremented by 1
 *      - MUST NOT modify currentTally
 *      - If candidateId not in tally, add it with count 1
 *
 * @example
 *   const election = createElection([
 *     { id: "C1", name: "Sarpanch Ram", party: "Janata" },
 *     { id: "C2", name: "Pradhan Sita", party: "Lok" }
 *   ]);
 *   election.registerVoter({ id: "V1", name: "Mohan", age: 25 });
 *   election.castVote("V1", "C1", r => "voted!", e => "error: " + e);
 *   // => "voted!"
 */
export function createElection(candidates) {
  const candidateMap = new Map();
  const votes = {};
  const voters = new Set();
  const voted = new Set();

  if (Array.isArray(candidates)) {
    candidates.forEach((c) => {
      if (c && c.id) {
        candidateMap.set(c.id, { ...c });
        votes[c.id] = 0;
      }
    });
  }

  function registerVoter(voter) {
    if (!voter || typeof voter !== "object" || !voter.id || !voter.name || typeof voter.age !== "number" || voter.age < 18) return false;
    if (voters.has(voter.id)) return false;
    voters.add(voter.id);
    return true;
  }

  function castVote(voterId, candidateId, onSuccess, onError) {
    if (typeof onSuccess !== "function" || typeof onError !== "function") return null;
    if (!voters.has(voterId)) return onError("voter not registered");
    if (!candidateMap.has(candidateId)) return onError("candidate not found");
    if (voted.has(voterId)) return onError("already voted");
    voted.add(voterId);
    votes[candidateId] = (votes[candidateId] || 0) + 1;
    return onSuccess({ voterId, candidateId });
  }

  function getResults(sortFn) {
    const result = Array.from(candidateMap.values()).map((c) => ({ ...c, votes: votes[c.id] || 0 }));
    if (typeof sortFn === "function") return [...result].sort(sortFn);
    return [...result].sort((a, b) => b.votes - a.votes);
  }

  function getWinner() {
    const result = getResults();
    if (result.length === 0 || result[0].votes === 0) return null;
    return result[0];
  }

  return { registerVoter, castVote, getResults, getWinner };
}

export function createVoteValidator(rules) {
  return (voter) => {
    if (!voter || typeof voter !== "object") return { valid: false, reason: "invalid voter" };
    const minAge = rules?.minAge || 18;
    const requiredFields = Array.isArray(rules?.requiredFields) ? rules.requiredFields : ["id", "name", "age"];
    for (const field of requiredFields) {
      if (!(field in voter)) return { valid: false, reason: `${field} is required` };
    }
    if (typeof voter.age !== "number") return { valid: false, reason: "age must be number" };
    if (voter.age < minAge) return { valid: false, reason: "age too low" };
    return { valid: true, reason: "" };
  };
}

export function countVotesInRegions(regionTree) {
  if (!regionTree || typeof regionTree !== "object" || typeof regionTree.votes !== "number") return 0;
  const sub = Array.isArray(regionTree.subRegions) ? regionTree.subRegions : [];
  return regionTree.votes + sub.reduce((sum, child) => sum + countVotesInRegions(child), 0);
}

export function tallyPure(currentTally, candidateId) {
  if (!currentTally || typeof currentTally !== "object") return { [candidateId]: 1 };
  const existing = currentTally[candidateId] || 0;
  return { ...currentTally, [candidateId]: existing + 1 };
}
