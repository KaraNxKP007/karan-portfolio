type Vote = "like" | "dislike" | null;

function key(slug: string) {
  return `kp-blog-vote-${slug}`;
}

export function getVote(slug: string): Vote {
  return (localStorage.getItem(key(slug)) as Vote) || null;
}

export function setVote(slug: string, vote: Vote) {
  const current = getVote(slug);
  const newVote = current === vote ? null : vote; // clicking same button again un-votes
  localStorage.setItem(key(slug), newVote || "");
  return { vote: newVote };
}