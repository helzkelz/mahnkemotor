export default function handler(req, res) {
  // Stub: Replace with DB/Redis integration
  res.json({
    missions: [
      { id: 1, slug: "init-demo", mission_goal: "Initialize demo mission", status: "success" },
      { id: 2, slug: "backup-1", mission_goal: "Perform backup", status: "pending" }
    ]
  });
}