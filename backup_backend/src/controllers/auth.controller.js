export async function signup(req, res) {
  res.send("Signup endpoint");
}

export async function login (req, res) {
  res.send("Login endpoint" );
}

export function logout (req, res) {
  res.send("Logout endpoint");
}