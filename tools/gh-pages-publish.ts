const { cd, exec, echo, touch } = require("shelljs")
// @ts-ignore
const { readFileSync } = require("fs")
const url = require("url")

let repoUrl
// @ts-ignore
let pkg = JSON.parse(readFileSync("package.json") as any)
if (typeof pkg.repository === "object") {
  if (!pkg.repository.hasOwnProperty("url")) {
    throw new Error("URL does not exist in repository section")
  }
  repoUrl = pkg.repository.url
} else {
  repoUrl = pkg.repository
}

let parsedUrl = url.parse(repoUrl)
let repository = (parsedUrl.host || "") + (parsedUrl.path || "")

let ghToken = process.env.GH_TOKEN || 'a48141557cec57695fac527700b0f41f526839cd'

echo("Deploying docs!!!")
cd("docs")
touch(".nojekyll")
exec("git init")
exec("git add .")
exec('git config user.name "landluck"')
exec('git config user.email "245354431@qq.com"')
exec('git commit -m "docs(docs): update gh-pages"')
exec(
  `git push --force --quiet origin master:gh-pages`
)
echo("Docs deployed!!")
