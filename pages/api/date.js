export default function handler(request, response) {
  let a = new Date();
  return response.status(200).json(a);
}
