export var luck_preco = 100
export const valor_minerios = [10, 15, 25]
export const hp_minerios = [4, 5, 7]
export var speed_preco = 75

export function carregar_Luck(Slot, upgrade) {
    const SlotSelecionado = document.getElementById(Slot)
    SlotSelecionado.src = "../Ore-Miner/images/luck.png"
    if (Slot == "pw-1") {
        const preco = document.getElementById("preco-1")
        const preco_final = luck_preco * upgrade
        preco.textContent = "PREÇO: $" + preco_final
    }
    if (Slot == "pw-2") {
        const preco = document.getElementById("preco-2")
        const preco_final = luck_preco * upgrade
        preco.textContent = "PREÇO: $" + preco_final
    }
    if (Slot == "pw-3") {
        const preco = document.getElementById("preco-3")
        const preco_final = luck_preco * upgrade
        preco.textContent = "PREÇO: $" + preco_final
    }
}

export function carregar_Speed(Slot, upgrade) {
    const SlotSelecionado = document.getElementById(Slot)
    SlotSelecionado.src = "../Ore-Miner/images/fire.png"
    if (Slot == "pw-1") {
        const preco = document.getElementById("preco-1")
        const preco_final = speed_preco * upgrade
        preco.textContent = "PREÇO: $" + preco_final
    }
    if (Slot == "pw-2") {
        const preco = document.getElementById("preco-2")
        const preco_final = speed_preco * upgrade
        preco.textContent = "PREÇO: $" + preco_final
    }
    if (Slot == "pw-3") {
        const preco = document.getElementById("preco-3")
        const preco_final = speed_preco * upgrade
        preco.textContent = "PREÇO: $" + preco_final
    }
}



