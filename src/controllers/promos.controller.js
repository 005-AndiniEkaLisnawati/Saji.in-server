import * as promoService from '../services/promos.service.js'

export const getPromos = async (req, res) => {
  try {
    const promos = await promoService.getAllPromos()
    res.json(promos)
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data promo' })
  }
}

export const createPromo = async (req, res) => {
  try {
    const { name, type, value, is_active } = req.body

    if (!name || !type || value == null) {
      return res.status(400).json({ message: 'Input tidak lengkap' })
    }

    const promo = await promoService.createPromo({
      name,
      type,
      value: Number(value),
      is_active: is_active ?? true
    })

    res.status(201).json(promo)
  } catch (error) {
    res.status(500).json({ message: 'Gagal menambahkan promo' })
  }
}

export const updatePromo = async (req, res) => {
  try {
    const id_promos = Number(req.params.id)
    const { name, type, value, is_active } = req.body

    const promo = await promoService.updatesPromo(id_promos, {
      name,
      type,
      value,
      is_active
    })

    res.json(promo)
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengubah promo' })
  }
}

export const deletePromo = async (req, res) => {
  try {
    const id_promos = Number(req.params.id)
    await promoService.deletePromo(id_promos)

    res.json({ message: 'Promo berhasil dihapus' })
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus promo' })
  }
}