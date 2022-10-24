| # | Name | Repository | Stars | Query Language | Language | License | Last Commit | Created |
|:-:|------|------------|------:|:--------------:|:--------:|---------|:-----------:|:-------:|
{{#each repositories_info}}
| {{number}} | {{#if homepage}}[{{name}}]({{homepage}}){{else}}{{name}}{{/if}} | [{{full_name}}](https://github.com/{{full_name}}) | {{stargazers_count}} | {{query_language}} | {{language}} | {{license.name}} | {{lastCommit}} | {{createdAt}} |
{{/each}}
