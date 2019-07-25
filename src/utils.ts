/**
 * 创建唯一id
 */

export function createUid(): string {

  return (Math.random()).toString().substr(2)
}
