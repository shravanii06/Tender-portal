from services.tender_service import save_tender

sample_text = """
The Public Works Department invites tenders for road construction in Nagpur.
Budget 5 crore rupees.
Strict penalties apply.
"""

save_tender(
    title="Road Project",
    text=sample_text,
    user_interest="road construction infrastructure"
)
